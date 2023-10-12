import { render, screen } from '@testing-library/react'
import Header from '@/app/components/header'
import { NextIntlClientProvider } from 'next-intl'

describe('Header', () => {

    const locale = 'sv'
    const messages = require(`../messages/${locale}.json`)

    it('should have logo images', () => {

        render(
            <NextIntlClientProvider locale={locale} messages={messages}>
                <Header />
            </NextIntlClientProvider>
        )

        const images = screen.queryAllByRole('img')

        expect(images.length).toBeGreaterThan(0)
    }) 

    it('should have title', () => {
        render(
            <NextIntlClientProvider locale={locale} messages={messages}>
                <Header />
            </NextIntlClientProvider>
        )

        const titles = screen.queryAllByText('Kvalitetsuppföljning')

        expect(titles.length).toBeGreaterThan(0)

    })



})