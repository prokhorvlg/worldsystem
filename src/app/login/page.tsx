'use client'
import {
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  PaperProps,
  Divider,
  Stack
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { upperFirst, useToggle } from '@mantine/hooks'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Container } from 'postcss'

export default function Login(props: PaperProps) {
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
    <Paper radius="md" p="xl" withBorder {...props}>
      <Group grow mb="md" mt="md">
        {/* <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton> */}
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(async (formContents) => {
          if (type === 'register') {
            console.log('formContents', formContents)
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
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
          } else {
            const res = await signIn('credentials', {
              email: formContents.email,
              password: formContents.password
              // callbackUrl: `http://localhost:3000/dashboard`,
              // redirect: true
            })

            if (res && res.ok) {
              redirect(`/dashboard`)
            }

            console.log(res)
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
  )
}
