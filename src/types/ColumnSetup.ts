export enum ColumnWidthMetrics {
	em = 'em',
	px = 'px'
}

export type ColumnSetup = {
	title: string
	property: string
	width?: {
		value: number,
		metric: ColumnWidthMetrics
	}
}