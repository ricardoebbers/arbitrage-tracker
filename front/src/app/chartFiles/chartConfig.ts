export const ChartConfig: IChartConfig = {
    showLabels: true,
    animations: false,
    xAxis: true,
    yAxis: true,
    showYAxisLabel: true,
    showXAxisLabel:  true,
    xAxisLabel: 'Time',
    yAxisLabel: 'Value',
    timeline: true,
    showGridLines: false,
    trimXAxisTicks: true,
    maxXAxisTickLength: 10,
    maxYAxisTickLength: 10,
    autoScale: true,
    view: [1200, 600],
    colorScheme: {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    }
}

export interface IChartConfig {
    showLabels: boolean,
    animations: boolean,
    xAxis: boolean,
    yAxis: boolean,
    showYAxisLabel: boolean,
    showXAxisLabel:  boolean,
    xAxisLabel: string,
    yAxisLabel: string,
    timeline: boolean,
    showGridLines: boolean,
    trimXAxisTicks: boolean,
    maxXAxisTickLength: number,
    maxYAxisTickLength: number,
    autoScale: boolean,
    view: [number, number],
    colorScheme: {
        domain: string[]
    }
}