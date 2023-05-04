import { useState } from "react"

export default function ShowVisible() {
    const [visible, setVisible] = useState<'form' | 'downloadCard' | 'spinner'>('form')

    const showDownloadCard = () => { setVisible('downloadCard') }
    const showForm = () => { setVisible('form') }
    const showSpinner = () => {setVisible('spinner')}

    return {
        visibleForm: visible === 'form',
        visibleDownloadCard: visible === 'downloadCard',
        visibleSpinner: visible === 'spinner',
        showDownloadCard,
        showForm,
        showSpinner
    }
}