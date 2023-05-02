import { useState } from "react"

export default function ShowVisible() {
    const [visible, setVisible] = useState<'form' | 'downloadCard'>('form')

    const showDownloadCard = () => setVisible('downloadCard')
    const showForm = () => setVisible('form')

    return {
        visibleForm: visible === 'form',
        visibleDownloadCard: visible === 'downloadCard',
        showDownloadCard,
        showForm
    }
}