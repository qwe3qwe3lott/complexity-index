export enum ColumnWidthMetrics {
	em = 'em',
	px = 'px'
}

export enum ColumnModes {
	PERCENT = 'percent'
}

export type ColumnSetup = {
	title: string
	property: string
	width?: {
		value: number,
		metric: ColumnWidthMetrics
	},
	mode?: ColumnModes
}