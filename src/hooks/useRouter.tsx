export default function useRouter(){
    function navigateTo(path) {
        window.history.pushState({}, '', path)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return {
        navigateTo
    }
}