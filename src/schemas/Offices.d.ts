export type OfficesContentItem = {
    id: number,
    office_name: string,
    number: string,
    date_of_inclusion: string,
    date_of_expiration: string,
    tooltip: string,
    legal_entity: string,
}

export type OfficesRegion = {
    id: number,
    name: string,
    type: string
}

export type OfficesCity = {
    id: number,
    name: string,
    type: string
}

export type OfficesSpecialization = {
    id: number,
    name: string
}

export type OfficesItem = {
    id: number,
    name: string,
    city?: OfficesCity,
    region?: OfficesRegion,
    specialization?: OfficesSpecialization,
    license_agreement: OfficesContentItem
}

export type OfficeManager = {
    id: number,
    last_name: string,
    first_name: string,
    patronymic: string,
    'work_position': string,
    'photo': string,
    'description': string
}

export interface OfficePage {
    id: number,
    'name': string,
    'logotype': string,
    'managers': OfficeManager[],
    'license_agreement': OfficesContentItem,
    'address': string,
    emails: string[],
    phone_numbers: string[],
    type: 'main' | 'regional' | 'specialized' | 'industry';
    'type_label': string,
    'region'?: OfficesRegion,
    'city'?: OfficesCity,
    'specialization'?: OfficesSpecialization,
    'industry'?: OfficesSpecialization,
    'services'?: OfficesSpecialization[]
}
