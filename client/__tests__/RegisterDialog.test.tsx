import { render, screen } from '@testing-library/react'
import RegisterDialog from '@/app/components/registerdialog'
import { NextIntlClientProvider } from 'next-intl'

describe('RegisterDialog', () => {

    const locale = 'sv'
    const messages = require(`../messages/${locale}.json`)

    it('should have title', () => {
        render(
            <NextIntlClientProvider locale={locale} messages={messages}>
                <RegisterDialog isOpen={true} />
            </NextIntlClientProvider>
        )

        expect(screen.getByText('Registrera ny användare')).toBeInTheDocument()
    })

    it('should have text input fields', () => {
        render(
            <NextIntlClientProvider locale={locale} messages={messages}>
                <RegisterDialog isOpen={true} />
            </NextIntlClientProvider>
        )

        const textFields = [
            screen.getByTestId('email'),
            screen.getByTestId('password'),
            screen.getByTestId('name')
        ]

        textFields.forEach(textField => {
            expect(textField).toBeInTheDocument()
        })

    })


})