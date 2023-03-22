// set "onclick" attribute for all buttons
function load() {
    let calc = document.getElementById("mainCalc");
    calc.addEventListener("click", (event) => {
        const isBtn = event.target.nodeName === "BUTTON";
        if (!isBtn) {
            return null;
        }
        else {
            let exp = document.getElementById("expression").value;

            if (/[0-9.+*/-]/.test(event.target.innerText) === true) {
                document.getElementById("expression").value = exp + event.target.innerText;
            }
            else if (event.target.id === "backspace") {
                document.getElementById("expression").value = exp.slice(0, exp.length - 1);
            }
            else if (event.target.innerText === "=" && exp !== "") {
                try {
                    const result = eval(exp);
                    if (result !== undefined) {
                        document.getElementById("expression").value = result;
                    }
                    else throw "wrong";
                }
                catch {
                    // show a toast object (Bootstrap) for say "wrong expression"
                    try {
                        document.getElementsByClassName("container-fluid").item(0).removeChild(document.getElementsByClassName("toast").item(0));
                    }
                    catch {
                        document.getElementsByClassName("container-fluid").item(0).removeChild(document.getElementsByClassName("alert").item(0));
                    }
                    finally {
                        let toast = document.createElement("div");
                        toast.className = "toast position-fixed d-block bg-danger bg-opacity-50 fade show rounded-4";
                        toast.style.bottom = "15px";
                        toast.style.right = "15px";
                        toast.id = "toast";

                        let toastHeader = document.createElement("div");
                        toastHeader.className = "toast-header d-flex justify-content-between rounded-top-4";
                        let heading = document.createElement("h4");
                        let btnClose = document.createElement("button");
                        heading.innerText = "Something is wrong";
                        heading.className = "col-9"
                        btnClose.className = "btn-close w-25";
                        btnClose.setAttribute("data-bs-dismiss", "toast");

                        let toastBody = document.createElement("div");
                        let body = document.createElement("p");
                        toastBody.className = "toast-body";
                        body.innerText = "The entered expression is not valid. Try again!";
                        body.className = "fs-6";

                        toastHeader.appendChild(heading);
                        toastHeader.appendChild(btnClose);
                        toastBody.appendChild(body);
                        toast.appendChild(toastHeader);
                        toast.appendChild(toastBody);
                        document.getElementsByClassName("container-fluid").item(0).appendChild(toast);
                    }
                }
            }
        }
    })

    // code for show toasts everytime
    let toastElements = [].slice.call(document.querySelectorAll(".toast"));
    let toastList = toastElements.map(function (toastEl) { return new bootstrap.Toast(toastEl) });
    toastList.forEach(toast => toast.show());
}

// control keys that pressed in input
function keyControl(e) {
    if (e.key === "Enter") {
        document.getElementById("expression").value = eval(document.getElementById("expression").value);
    }
    else if (/[0-9.+*/-]/.test(e.key) !== true && e.code !== "Backspace") {
        e.preventDefault();
    }
}

// copy text
function copy() {
    try {
        document.getElementsByClassName("container-fluid").item(0).removeChild(document.getElementsByClassName("toast").item(0));
    }
    catch {
        document.getElementsByClassName("container-fluid").item(0).removeChild(document.getElementsByClassName("alert").item(0));
    }
    finally {
        try {
            document.execCommand("copy", false, document.getElementById('expression').value);

            let alertSuccess = document.createElement("div");
            let text = document.createElement("p")
            let btnClose = document.createElement("button")

            alertSuccess.className = "alert alert-dismissible position-fixed alert-success fade show rounded-4"
            alertSuccess.style.bottom = "15px"
            alertSuccess.style.right = "15px"
            text.innerText = "The box text copied! \n Operation successfully."
            text.className = "alert-heading"
            btnClose.className = "btn-close fs-6"
            btnClose.setAttribute("data-bs-dismiss", "alert")

            alertSuccess.appendChild(text)
            alertSuccess.appendChild(btnClose)
            document.getElementsByClassName("container-fluid").item(0).appendChild(alertSuccess)
        }
        catch (error) {
            let alertWrong = document.createElement("div");
            let text = document.createElement("p")
            let btnClose = document.createElement("button")

            alertWrong.className = "alert alert-dismissible position-fixed alert-danger fade show rounded-4"
            alertWrong.style.bottom = "15px"
            alertWrong.style.right = "15px"
            text.innerText = "Operation failed! "
            text.className = "alert-heading"
            btnClose.className = "btn-close fs-6"
            btnClose.setAttribute("data-bs-dismiss", "alert")

            alertWrong.appendChild(text)
            alertWrong.appendChild(btnClose)
            document.getElementsByClassName("container-fluid").item(0).appendChild(alertWrong)
        }
    }
}
