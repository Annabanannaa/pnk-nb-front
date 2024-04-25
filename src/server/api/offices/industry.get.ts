const offices = [
    {
        'id': 2,
        'name': 'Отраслевой тип офиса "Тест"',
        'industry': {
            'id': Math.ceil(Math.random() * 1000),
            'name': 'Тестовая отрасль'
        },
        'license_agreement': {
            'id': Math.ceil(Math.random() * 1000),
            'office_name': 'Отраслевой',
            'number': '115',
            'date_of_inclusion': '2024-02-01',
            'date_of_expiration': '2024-03-08',
            'tooltip': '',
            'legal_entity': ''
        }
    }
]


export default defineEventHandler(async (event) => {
    const totalUsers = offices.length
    const query = getQuery(event)

    if (query.generateError) {
        throw createError({
            statusCode: 401,
            message: 'У вас недостаточно прав'
        })

    }

    const limit = parseInt(query.limit as string) || 20
    const page = parseInt(query.page as string) || 1
    const pages = Math.ceil(totalUsers / limit)
    const spliceStart = page === 1 ? 0 : (page * limit) - 1
    const results = offices.slice(spliceStart, spliceStart + limit)

    return {
        count: totalUsers,
        page,
        total: pages,
        next: page === pages ? null : page + 1,
        previous: page <= 0 ? 1 : page - 1,
        results
    }
})

