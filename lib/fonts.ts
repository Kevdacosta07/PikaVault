
import {Manrope, Outfit, Poppins, Open_Sans, Roboto, Permanent_Marker} from 'next/font/google'

export const manrope = Manrope({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    variable: '--font-manrope',
    display: 'swap',
})

export const outfit = Outfit({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
    variable: '--font-outfit',
    display: 'swap',
})

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
    display: 'swap',
})

export const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-open-sans',
    display: 'swap',
})

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-roboto',
    display: 'swap',
})

export const permanentMarker = Permanent_Marker({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-permanent-marker',
    display: 'swap',
})