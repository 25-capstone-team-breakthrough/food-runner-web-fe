import Swal from "sweetalert2";
import "./customAlert.css";

export const showCustomAlert = async (options = {}) => {
    const isDark = options.theme === "dark";

    return Swal.fire({
        title: options.title || "알림",
        text: options.text || "",
        icon: options.icon || "info",
        confirmButtonText: options.confirmButtonText || "확인",
        cancelButtonText: options.cancelButtonText || "취소",
        showCancelButton: options.showCancelButton || false,
        buttonsStyling: false,
        returnFocus: false, // 포커스 복구 방지
        customClass: {
            popup: isDark ? "custom-swal-popup dark" : "custom-swal-popup",
            icon: "custom-swal-icon",
            title: "custom-swal-title",
            htmlContainer: "custom-swal-html",
            confirmButton: isDark ? "custom-swal-confirm dark" : "custom-swal-confirm",
            cancelButton: isDark ? "custom-swal-cancel dark" : "custom-swal-cancel"
        },
        didOpen: () => {
            Swal.getConfirmButton()?.blur();
            Swal.getCancelButton()?.blur();

            // 포커스 스크롤 방지
            const popup = Swal.getPopup();
            if (popup) {
                popup.focus({ preventScroll: true });
            }
        }
    });
};