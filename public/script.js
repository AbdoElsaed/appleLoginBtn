(async() => {
    const getAppleLoginUrl = async () => {
        let res = await fetch('/getAppleLoginUrl');
        let data = await res.json();
        const { appleLoginUrl } = data;
        return appleLoginUrl;
    }
    
    document.getElementById('appleBtn').href = await getAppleLoginUrl();
})()