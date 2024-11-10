"use client"
import UserInfoModal from '@/components/Modals/UserInfoModal'
import useModalStore from '@/store/useModalStore'

const ModalProvider = () => {
    const { showModal } = useModalStore()
    if (!showModal) return

    console.log("showModal", showModal)

    switch (showModal) {
        case "USER_INFO_MODAL":
            return <UserInfoModal />
        case "LOGOUT_MODAL":
            return <></>
        default:
            return <></>
    }
}

export default ModalProvider