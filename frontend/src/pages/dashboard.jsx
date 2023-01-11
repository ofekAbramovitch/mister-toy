import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadToys } from '../store/actions/toy.action'
import { LabelsCountChart } from '../cmps/chart1'
import { LabelsPriceChart } from '../cmps/chart2'

export function Chart() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => [
        loadToys()
    ], [])

    function getChartsData() {
        const chartsData = toys.reduce(
            (acc, toy) => {
                toy.labels.forEach((label) => {
                    acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1
                    acc.labelsPriceMap[label] = acc.labelsPriceMap[label] ? (acc.labelsPriceMap[label] += toy.price) : toy.price
                })

                return acc
            },
            { labelsCountMap: {}, labelsPriceMap: {} }
        )
        Object.keys(chartsData.labelsPriceMap).forEach((label) => (chartsData.labelsPriceMap[label] /= chartsData.labelsCountMap[label]))

        return chartsData
    }

    const { labelsPriceMap, labelsCountMap } = getChartsData()

    return (
        <section className="dashboard">
            <h1>Some statistics...</h1>
            <div className="chart flex">
                <LabelsCountChart dataMap={labelsCountMap} />
                <LabelsPriceChart dataMap={labelsPriceMap} />
            </div>
        </section>
    )
}