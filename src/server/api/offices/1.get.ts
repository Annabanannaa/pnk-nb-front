const office = {
    'id': 0,
    'name': 'string',
    'logotype': '/images/office/logo.svg',
    'managers': [
        {
            'id': 0,
            'last_name': 'string',
            'first_name': 'string',
            'patronymic': 'string',
            'work_position': 'string',
            'photo': 'string',
            'description': 'string'
        }
    ],
    'license_agreement': {
        'id': 0,
        'office_name': 'string',
        'number': 'string',
        'date_of_inclusion': '2024-03-25',
        'date_of_expiration': '2024-03-25',
        'tooltip': '',
        'legal_entity': ''
    },
    'address': 'string',
    'emails': [
        'user@example.com'
    ],
    'phone_numbers': [
        '24-92964803553'
    ],
    'type': 'specialized',
    'type_label': 'string',
    'region': {
        'id': 0,
        'name': 'string',
        'type': 'region'
    },
    'city': {
        'id': 0,
        'name': 'string',
        'type': 'region'
    },
    'specialization': {
        'id': 0,
        'name': 'string'
    },
    'industry': {
        'id': 0,
        'name': 'string'
    },
    'services': [
        {
            'id': 0,
            'name': 'string'
        }
    ]
}



export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (query.generateError) {
        throw createError({
            statusCode: 401,
            message: 'У вас недостаточно прав'
        })

    }
    return office
})

// regional, specialized, industry

