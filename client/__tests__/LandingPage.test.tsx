import { render, screen, waitFor } from '@testing-library/react'
import LandingPage from '@/app/[locale]/account/page'
import { NextIntlClientProvider } from 'next-intl'

const mockData = {
    name: 'Lucas Hultqvist',
    role: 'CONSULTANT',
    forms: [],
    id: 1,
}

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve(mockData)
    })
) as jest.Mock

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null
        }
    }
}))

describe('LandingPage', () => {

    const locale = 'sv'
    const messages = require(`../messages/${locale}.json`)

    it('should have "Konsult" text', async () => {

        render(
            <NextIntlClientProvider locale={locale} messages={messages}>
                <LandingPage />
            </NextIntlClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByText('Konsult')).toBeInTheDocument()
        })

    })

    it('should not have a button', async () => {

        render(
            <NextIntlClientProvider locale={locale} messages={messages}>
                <LandingPage />
            </NextIntlClientProvider>
        )
        
        await waitFor(() => {
            const buttons = screen.queryAllByRole('button')
            expect(buttons).toHaveLength(0)
        })

    })

})