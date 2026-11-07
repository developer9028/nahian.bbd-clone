import type { Metadata } from 'next'

import { ContactView } from '@/views/contact/ContactView'

export const metadata: Metadata = {
  title: 'Contact — Nahian',
  description: 'Have a project, a role or just a question? Pick whatever’s easiest.',
}

const ContactPage = () => <ContactView />

export default ContactPage
