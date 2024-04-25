export type Column = {
    id: string,
    label: string
}

export type Cell = {
    tooltip?: string,
    label: string
}

export type ColumnsCollection = Column[];

export type Row = Record<string, string | number>

export type RowsCollection = Row[];
