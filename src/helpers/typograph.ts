import Typograf from 'typograf'

interface TypografInstance extends Typograf {}

let typografInstance: TypografInstance | null = null

export const makeTextPretty = (html: string): string => {
    if (typografInstance === null) {
        typografInstance = new Typograf({
            locale: ['ru']
        })
    }

    if (!typografInstance) {
        return html
    }

    return typografInstance.execute(html)
}
