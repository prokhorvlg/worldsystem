// 'use client'

import { Container, Title, Text, Button } from '@mantine/core'
import classes from './LandingHero.module.css'
import Link from 'next/link'

export function LandingHero() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Build and share your{' '}
              <Text component="span" inherit c="highlight">
                science-fiction world
              </Text>
            </Title>

            <Text className={classes.description} mt={30}>
              <strong>worldarium</strong> provides you with the tools to create,
              store, and share your worldbuilding project to the web.
            </Text>

            <Button
              size="xl"
              className={classes.control}
              mt={40}
              component={Link}
              href="/login"
              // variant="filled"
              // onClick={() => console.log('click')}
            >
              Create a project
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
