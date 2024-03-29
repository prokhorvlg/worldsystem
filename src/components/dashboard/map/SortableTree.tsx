import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Announcements,
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  MeasuringStrategy,
  DropAnimation,
  Modifier,
  defaultDropAnimation
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import {
  buildTree,
  flattenTree,
  getProjection,
  getChildCount,
  removeItem,
  removeChildrenOf,
  setProperty
} from './utilities'
import type { FlattenedItem, SensorContext, TreeItem, TreeItems } from './types'
import { sortableTreeKeyboardCoordinates } from './keyboardCoordinates'
import { SortableTreeItem } from './components'
import { CSS } from '@dnd-kit/utilities'

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
}

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5
        })
      }
    ]
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing
    })
  }
}

interface Props {
  collapsible?: boolean
  items: TreeItems
  indentationWidth?: number
  indicator?: boolean
  removable?: boolean
  itemComponent: (...props: any) => React.ReactNode
  onDragEnd?: (id: string, newParentId: string) => void
}

export function SortableTree({
  collapsible,
  items,
  indicator = false,
  indentationWidth = 50,
  removable,
  itemComponent,
  onDragEnd
}: Props) {
  // const [items, setItems] = useState(() => defaultItems)

  const [activeId, setActiveId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: string | null
    overId: string
  } | null>(null)

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items)
    const collapsedItems = flattenedTree.reduce<string[]>(
      (acc, { children, collapsed, id }) =>
        collapsed && children.length ? [...acc, id] : acc,
      []
    )

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    )
  }, [activeId, items])

  const projected =
    activeId && overId
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth
        )
      : null
  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft
  })
  const [coordinateGetter] = useState(() =>
    sortableTreeKeyboardCoordinates(sensorContext, indicator, indentationWidth)
  )
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter
    })
  )

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  )
  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft
    }
  }, [flattenedItems, offsetLeft])

  const announcements: Announcements = {
    onDragStart({ active }) {
      console.log('onDragStart!', active?.id)
      return `Picked up ${active.id}.`
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement(
        'onDragMove',
        active.id as string,
        over?.id as string
      )
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement(
        'onDragOver',
        active.id as string,
        over?.id as string
      )
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement(
        'onDragEnd',
        active.id as string,
        over?.id as string
      )
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`
    }
  }
  useEffect(() => {
    console.log('flattenedItems', flattenedItems)
  }, [flattenedItems])

  return (
    <DndContext
      accessibility={{ announcements }}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map((item) => {
          const { id, children, collapsed, depth } = item
          return (
            <SortableTreeItem
              key={id}
              id={id}
              value={id}
              depth={id === activeId && projected ? projected.depth : depth}
              indentationWidth={indentationWidth}
              indicator={indicator}
              collapsed={Boolean(collapsed && children.length)}
              onCollapse={
                collapsible && children.length
                  ? () => handleCollapse(id)
                  : undefined
              }
              onRemove={removable ? () => handleRemove(id) : undefined}
            >
              {itemComponent(item)}
            </SortableTreeItem>
          )
        })}
        {createPortal(
          <DragOverlay
            dropAnimation={dropAnimationConfig}
            modifiers={indicator ? [adjustTranslate] : undefined}
          >
            {activeId && activeItem ? (
              <SortableTreeItem
                id={activeId}
                depth={activeItem.depth}
                clone
                childCount={getChildCount(items, activeId) + 1}
                value={activeId.toString()}
                indentationWidth={indentationWidth}
              >
                hi
              </SortableTreeItem>
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  )

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(activeId as string)
    setOverId(activeId as string)

    const activeItem = flattenedItems.find(({ id }) => id === activeId)

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId as string
      })
    }

    document.body.style.setProperty('cursor', 'grabbing')
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x)
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId((over?.id as string) ?? null)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState()

    if (projected && over) {
      const { depth, parentId } = projected

      if (onDragEnd) onDragEnd(active.id as string, parentId as string)
      // console.log('handleDragEnd!', parentId)

      // const clonedItems: FlattenedItem[] = JSON.parse(
      //   JSON.stringify(flattenTree(items))
      // )
      // const overIndex = clonedItems.findIndex(({ id }) => id === over.id)
      // const activeIndex = clonedItems.findIndex(({ id }) => id === active.id)
      // const activeTreeItem = clonedItems[activeIndex]

      // clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId }

      // const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)
      // const newItems = buildTree(sortedItems)

      // setItems(newItems)
    }
  }

  function handleDragCancel() {
    resetState()
  }

  function resetState() {
    setOverId(null)
    setActiveId(null)
    setOffsetLeft(0)
    setCurrentPosition(null)

    document.body.style.setProperty('cursor', '')
  }

  function handleRemove(id: string) {
    // setItems((items) => removeItem(items, id))
  }

  function handleCollapse(id: string) {
    // setItems((items) =>
    //   setProperty(items, id, 'collapsed', (value) => {
    //     return !value
    //   })
    // )
  }

  function getMovementAnnouncement(
    eventName: string,
    activeId: string,
    overId?: string
  ) {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId
          })
        }
      }

      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      )
      const overIndex = clonedItems.findIndex(({ id }) => id === overId)
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId)
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)

      const previousItem = sortedItems[overIndex - 1]

      let announcement
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved'
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested'

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1]
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`
        } else {
          let previousSibling: FlattenedItem | undefined = previousItem
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId: string | null = previousSibling.parentId
            previousSibling = sortedItems.find(({ id }) => id === parentId)
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`
          }
        }
      }

      return announcement
    }

    return
  }
}

const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25
  }
}
