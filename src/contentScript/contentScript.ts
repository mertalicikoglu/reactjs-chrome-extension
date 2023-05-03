// HTML elementlerini oluşturun
const widget = document.createElement("div");
const button = document.createElement("button");
const chatContainer = document.createElement("div");
const header = document.createElement("div");
const title = document.createElement("h3");
const form = document.createElement("div");
const nameLabel = document.createElement("label");
const nameInput = document.createElement("input");
const emailLabel = document.createElement("label");
const emailInput = document.createElement("input");
const messageLabel = document.createElement("label");
const maxTeklifLabel = document.createElement("label");

const kullaniciMaxTeklifLabel = document.createElement("label");


const minTeklifArtisMiktariLabel = document.createElement("label");
const messageInput = document.createElement("textarea");
const saveButton = document.createElement("button");

// CSS stillerini ayarlayın
widget.style.position = "fixed";
widget.style.bottom = "20px";
widget.style.right = "20px";
widget.style.backgroundColor = "#333";
widget.style.color = "#fff";
widget.style.padding = "10px";
widget.style.borderRadius = "5px";
button.style.border = "none";
button.style.backgroundColor = "transparent";
button.style.color = "#fff";
button.style.fontWeight = "bold";
button.textContent = "UyapBot";
chatContainer.style.display = "none";
chatContainer.style.position = "fixed";
chatContainer.style.bottom = "80px";
chatContainer.style.right = "20px";
chatContainer.style.backgroundColor = "#fff";
chatContainer.style.color = "#333";
chatContainer.style.borderRadius = "5px";
chatContainer.style.width = "300px";
header.style.backgroundColor = "#2196f3";
header.style.color = "#fff";
header.style.padding = "10px";
title.style.margin = "0";
title.textContent = "Uyap";
form.style.margin = "10px";
nameLabel.textContent = "Token:";
nameLabel.style.display = "block";
nameLabel.style.marginBottom = "5px";
nameInput.style.width = "100%";
nameInput.style.padding = "5px";
nameInput.style.marginBottom = "10px";
emailLabel.textContent = "Max Limit:";
emailLabel.style.display = "block";
emailLabel.style.marginBottom = "5px";
emailInput.style.width = "100%";
emailInput.style.padding = "5px";
emailInput.style.marginBottom = "10px";
messageLabel.textContent = "Message:";
messageLabel.style.display = "block";
messageLabel.style.marginBottom = "5px";
maxTeklifLabel.textContent = "Max Teklif:";
maxTeklifLabel.style.display = "block";
maxTeklifLabel.style.marginBottom = "5px";

kullaniciMaxTeklifLabel.textContent = "kullaniciMax Teklif:";
kullaniciMaxTeklifLabel.style.display = "block";
kullaniciMaxTeklifLabel.style.marginBottom = "5px";

minTeklifArtisMiktariLabel.textContent = "MinTeklifArtisMiktari Teklif:";
minTeklifArtisMiktariLabel.style.display = "block";
minTeklifArtisMiktariLabel.style.marginBottom = "5px";


messageInput.style.width = "100%";
messageInput.style.padding = "5px";
messageInput.style.resize = "none";
messageInput.style.height = "100px";
messageInput.style.marginBottom = "10px";
saveButton.style.backgroundColor = "#2196f3";
saveButton.style.color = "#fff";
saveButton.style.border = "none";
saveButton.style.padding = "5px 10px";
saveButton.style.borderRadius = "5px";
saveButton.style.float = "right";
saveButton.textContent = "Başlat";

// Buton tıklama olayını dinleyin
button.addEventListener("click", () => {
  chatContainer.style.display =
    chatContainer.style.display === "none" ? "block" : "none";
});
let token = "";
let maxTeklifNum = 0;
let maxLimit = 0;
let minTeklifArtisMiktariNum = 0;
let kullaniciMaxTeklifNum = 0;
let ihaleTeklifi = false;
// Save butonu tıklama olayını dinleyin
saveButton.addEventListener("click", () => {
  token = nameInput.value.trim();
  maxLimit = Number(emailInput.value.trim());
  const message = messageInput.value.trim();

  // Inputların boş olup olmadığını kontrol edin
  if (!token || !maxLimit || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Mesajı işleyin veya gönderin
  console.log(`Name: ${token}`);
  console.log(`Email: ${maxLimit}`);
  console.log(`Message: ${message}`);

  getBasicData(token, false);
});

chrome.runtime.sendMessage("I am loading content script", async (response) => {
  console.log("response...:", response);
  console.log("I am content script");
  mergeHtml();
});

function mergeHtml() {
  // HTML elementlerini birleştirin
  widget.appendChild(button);
  document.body.appendChild(widget);
  header.appendChild(title);
  chatContainer.appendChild(header);
  form.appendChild(saveButton);
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(emailLabel);
  form.appendChild(emailInput);
  form.appendChild(messageLabel);
  form.appendChild(maxTeklifLabel);
  form.appendChild(kullaniciMaxTeklifLabel);
  form.appendChild(minTeklifArtisMiktariLabel);
  form.appendChild(messageInput);

  chatContainer.appendChild(form);
  document.body.appendChild(chatContainer);
}

function setDate(targetDate) {
  setInterval(() => {
    messageLabel.textContent = countDown(targetDate);
    getBasicData(token, true);
  }, 1000);
}

function setMaxTeklif(maxTeklif) {
  maxTeklif = parseFloat(maxTeklif);
  maxTeklifLabel.textContent = maxTeklif;
  maxTeklifNum = maxTeklif;
  console.log("maxTeklifNum", maxTeklifNum);
}

function setKullaniciMaxTeklif(kullaniciMaxTeklif) {
  kullaniciMaxTeklif = parseFloat(kullaniciMaxTeklif);
  kullaniciMaxTeklifLabel.textContent = kullaniciMaxTeklif;
  kullaniciMaxTeklifNum = kullaniciMaxTeklif;
  console.log("kullaniciMaxTeklif", kullaniciMaxTeklif);

}


function setMinTeklifArtisMiktari(minTeklifArtisMiktari) {
  minTeklifArtisMiktari = parseFloat(minTeklifArtisMiktari);
  minTeklifArtisMiktariLabel.textContent = minTeklifArtisMiktari;
  minTeklifArtisMiktariNum = minTeklifArtisMiktari;
  console.log("minTeklifArtisMiktariNum", minTeklifArtisMiktariNum);
}


function countDown(targetDate) {
  const countDownDate = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const distance = countDownDate - now;

  if (distance < 0) {
    return "Expired";
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}


function getBasicData(token, interval): void {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/xml, text/xml, */*; q=0.01");
  myHeaders.append("Accept-Language", "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  myHeaders.append("Cookie", token);
  myHeaders.append("Origin", "https://esatis.uyap.gov.tr");
  myHeaders.append("Referer", window.location.href);
  myHeaders.append("Sec-Fetch-Dest", "empty");
  myHeaders.append("Sec-Fetch-Mode", "cors");
  myHeaders.append("Sec-Fetch-Site", "same-origin");
  myHeaders.append(
    "User-Agent",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
  );
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  myHeaders.append(
    "sec-ch-ua",
    '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"macOS"');
  const urlParams = new URLSearchParams(window.location.search);
  const kayitId = urlParams.get("kayitId");
  var raw = "kayitId=" + kayitId;

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://esatis.uyap.gov.tr/main/jsp/esatis/ihale_detay_bilgileri_brd.ajx",
    requestOptions
  )
    .then(async (response) => {
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      console.log("xmldoc", xmlDoc);

      const ihaleBitisZamani = xmlDoc.querySelector("ihaleBitisZamani");
      const maxTeklif = xmlDoc.querySelector("sonTeklif");
      const minTeklifArtisMiktari = xmlDoc.querySelector(
        "minTeklifArtisMiktari"
      );
      const kullaniciMaxTeklif = xmlDoc.querySelector(
        "kullaniciMaxTeklif"
      );
      console.log("ihaleBitisZamani", ihaleBitisZamani.textContent);
      console.log("maxTeklif", maxTeklif.textContent);
      console.log("kullaniciMaxTeklif", kullaniciMaxTeklif.textContent);
      if (!interval) {
        setDate(ihaleBitisZamani.textContent);
        setMinTeklifArtisMiktari(minTeklifArtisMiktari.textContent);
      }

      setMaxTeklif(maxTeklif?.textContent);
      setKullaniciMaxTeklif(kullaniciMaxTeklif?.textContent)

      if (kullaniciMaxTeklifNum && !ihaleTeklifi){

        if (maxTeklifNum  == 0 || (kullaniciMaxTeklifNum < maxTeklifNum && kullaniciMaxTeklifNum < maxLimit)) {
          const teklifMiktari = maxTeklifNum + minTeklifArtisMiktariNum;
          console.log("ihale teklifi yapıldı");
          ihaleTeklifi = true;
          setTimeout(() => {
            console.log("ihale teklifi timeout")
            ihaleTeklifi = false;
          }, 3000);
          //ihaleTeklifİslemleri(token, teklifMiktari)
        }
      }

      


    })
    .catch((error) => console.log("error", error));
}


function ihaleTeklifİslemleri(token, teklifMiktari) {
  ihaleTeklifi = true;
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
  myHeaders.append("Accept-Language", "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  myHeaders.append("Cookie", token);
  myHeaders.append("Origin", "https://esatis.uyap.gov.tr");
  myHeaders.append("Referer", window.location.href);
  myHeaders.append("Sec-Fetch-Dest", "empty");
  myHeaders.append("Sec-Fetch-Mode", "cors");
  myHeaders.append("Sec-Fetch-Site", "same-origin");
  myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"");
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", "\"Windows\"");


  const urlParams = new URLSearchParams(window.location.search);
  const kayitId = urlParams.get("kayitId");
  var raw = "kayitId=" + kayitId + "&teklifMiktari=" + teklifMiktari;

  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://esatis.uyap.gov.tr/main/jsp/esatis/ihaleTeklifIslemleri_brd.ajx", requestOptions)
    .then(response => response.text())
    .then(result => {
      ihaleTeklifi = false
      console.log("ihale teklifi",result)
    } )
    .catch(error => {
      ihaleTeklifi = false;
      console.log('error', error)});
}

window.onload = (event) => {
  console.log("page is fully loaded", window.location.href);
};
