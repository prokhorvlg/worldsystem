type DataNode = {
  id: string | number
  parentId: string | any
  [key: string]: any
}
type DataNodeWithChildren = DataNode & {
  children: DataNode[]
}

// export function listToTree<T extends Node>(data: T[]) {
//   var map = {},
//     node,
//     roots: ProcessedNode[] = [],
//     i

//   const newList: ProcessedNode[] = list.map((item) => {
//     return { ...item, children: [] }
//   })

//   for (i = 0; i < newList.length; i += 1) {
//     map[newList[i].id] = i // initialize the map
//   }

//   for (i = 0; i < newList.length; i += 1) {
//     node = newList[i]
//     if (node.parentId !== '0') {
//       // if you have dangling branches check that map[node.parentId] exists
//       newList[map[node.parentId]].children.push(node)
//     } else {
//       roots.push(node)
//     }
//   }
//   return roots

// }

// https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript/40732240#40732240
export const listToTree = (dataset: DataNode[]): DataNodeWithChildren[] => {
  const hashTable = Object.create(null)
  dataset.forEach((aData) => (hashTable[aData.id] = { ...aData, children: [] }))
  const dataTree: DataNodeWithChildren[] = []
  dataset.forEach((aData) => {
    if (aData.parentId)
      hashTable[aData.parentId].children.push(hashTable[aData.id])
    else dataTree.push(hashTable[aData.id])
  })
  return dataTree
}
