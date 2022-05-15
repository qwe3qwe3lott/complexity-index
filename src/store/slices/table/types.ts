import {IndexValue} from '../../../types/IndexValue';
import {SortSetup} from '../../../types/SortSetup';

export enum RowsPerPage {
	few = 25,
	some = 50,
	several = 75,
	many = 100
}

export type TableState = {
	years: number[]
	selectedYear: number
	indexValues: IndexValue[]
	currentPage: number
	rowsPerPage: RowsPerPage
	sortSetup: SortSetup<IndexValue>
}