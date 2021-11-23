const feedback = document.querySelector("#feedback");
const feedbackModal = document.querySelectorAll(".feedback-modal");
const feedbackHelp = document.querySelector("#form-help");
const kaspiButton = document.querySelectorAll(".kaspi");
const token = "1425912102:AAEDzsUhbYQhbQUU3t1NvSehzaxWY-xN0Xc";
const chat_id = "-557688317";
const modalCheckOut = document.querySelector("#modalCheckOut");
const btnCheckOut = document.querySelectorAll("#btn-checkout");

const getUTM = (url) => {
    return [...url.matchAll(/utm_([^=]+)=([^&]*)/g)].reduce(
        (acc, [, k, v]) => ((acc[k] = v), acc),
        {}
    );
};

window.addEventListener('DOMContentLoaded', async () => {
    try {
        kaspiButton.forEach(item => {
            item.classList.add('show')
        });
    } catch (e) {
        console.log(e)
    }
})

const fetchFeedback = async (e) => {
    try {
        e.preventDefault();
        let name = e.target.querySelector(".name").value;
        let phone = e.target.querySelector(".phone").value;
        // console.log(name, phone);

        let utm = getUTM(window.location.href);
        // console.log(utm);
        const utmText = `UTM метки. campaign:${
            utm.campaign || "нет данных"
        }\n, content: ${utm.content || "нет данных"}\n, medium:${
            utm.medium || "нет данных"
        }\n, source:${utm.source || "нет данных"}`;
        const text = `${utmText}. Обратный вызов. Имя: ${name} \n Телефон: ${phone}`;
        await fetch(
            `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}`
        );

        e.target.querySelector(".name").value = "";
        e.target.querySelector(".phone").value = "";
        document.location.replace("success.html");
    } catch (e) {
        console.log(e);
    }
};

const fetchFeedbackCatalog = async (e) => {
    try {
        e.preventDefault();
        const catalogName = e.target.querySelector(".catalog-name").textContent;
        const catalogCost = e.target.querySelector(".catalog-cost").textContent;
        
        const name = e.target.querySelector(".modal-name").value;
        const phone = e.target.querySelector(".modal-phone").value;
        const btnDis = e.target.querySelector("#btnDisabled");

        let utm = getUTM(window.location.href);
        btnDis.disabled = true;
        const utmText = `*UTM метки*.
            campaign:${utm.campaign || "нет данных"},\
            content: ${utm.content || "нет данных"}, medium:${
                    utm.medium || "нет данных"
                }, %0D
            source:${utm.source || "нет данных"}
            `;
        let sendPhone = "";
        const buttonName = e.target.querySelector("#feedback-buy").textContent;
        // console.log(buttonName, 73);
        let text = `${utmText} Заказ: *${catalogName.trim()}* ${catalogCost.trim()} Имя: ${
            name
        } 
        Телефон: ${phone}`;
        if(buttonName === "Оставьте заявку для покупки в рассрочку"){
            text = `${utmText} Рассрочка: *${catalogName.trim()}* ${catalogCost.trim()} Имя: ${
                name
            } 
            Телефон: ${phone}`;
        }
        // console.log(text, 86);
        const res = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}`
        );

        //XZXZXZXZXXZZXZXZXZX
        // var numberPattern = /\d+/g;
        var request = new XMLHttpRequest();
        request.open('POST', 'https://raskladnie-divani.kz/sendAmo.php', /* async = */ false);
        var formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('nameDeal', catalogName);
        formData.append('price', catalogCost.replace(/\D/g, ""));
        request.send(formData);
        console.log(request.response);
        //END XZXZXZXZXZXZXZX
        name.value = "";
        phone.value = "";
        document.location.replace("success.html");
        console.log("success");
    } catch (e) {
        console.log(e);
    }
};

if(feedback !== null){
    feedback.addEventListener("submit", fetchFeedback);
}
if(feedbackHelp!== null) feedbackHelp.addEventListener("submit", fetchFeedback);
// feedbackAllCatalog.addEventListener("submit", fetchFeedbackAllCatalog);
if(feedbackModal !== null){
    for (let feedback of feedbackModal) {
        feedback.addEventListener("submit", fetchFeedbackCatalog);
    }
}
