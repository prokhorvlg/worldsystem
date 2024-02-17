'use client'

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useToggle, upperFirst } from '@mantine/hooks'
import { signIn } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import classes from './LoginForm.module.css'
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react'

const LoginForm = () => {
  const router = useRouter()

  const [type, toggle] = useToggle(['login', 'register'])
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6 ? 'Password should include at least 6 characters' : null
    }
  })

  return (
    <div className={classes.center}>
      <Paper radius="md" p="xl" withBorder className={classes.card}>
        <Group grow mb="md" mt="md">
          <Button leftSection={<IconBrandGithub />} variant="default">
            GitHub
          </Button>
          <Button leftSection={<IconBrandGoogle />} variant="default">
            Google
          </Button>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={form.onSubmit(async (formContents) => {
            if (type === 'register') {
              // console.log('registering...', formContents)
              const res = await fetch(`/api/user`, {
                method: 'PUT',
                body: JSON.stringify({
                  name: formContents.name,
                  email: formContents.email,
                  password: formContents.password
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              })

              if (res && res.ok) {
                // console.log('registered!', formContents)
                router.push(`/dashboard`)
              }
            } else {
              const res = await signIn('credentials', {
                email: formContents.email,
                password: formContents.password,
                callbackUrl: `/dashboard`,
                redirect: true
              })

              if (res && res.ok) {
                router.push(`/dashboard`)
              }

              // console.log(res)
            }
          })}
        >
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  )
}

export default LoginForm
