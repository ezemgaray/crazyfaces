let tempSelected = {
    info: {
        name: "",
        mail: "",
        bday: "",
        sex: "",
    },
    avatar: {
        head: "",
        skin: "",
        topHead: "",
        eyebrow: "",
        eyes: "",
        mouth: ""
    }
}

let menu = {
    head: ['one', 'two', 'three', 'four', 'five'],
    skin: ['none', 'violet', 'green', 'red', 'blue', 'orange', 'purple', 'pink', 'light-blue', 'ferckles', 'gear', 'check', 'brown'],
    topHead: ['none', 'red-horns', 'black-horns', 'saint', 'punk', 'wig', 'hat'],
    eyebrow: ['none', 'fine', 'thick', 'thicker'],
    eyes: ['smaller', 'small', 'big', 'bigger', 'chinese', 'square', 'crazy'],
    mouth: ['simple', 'happy', 'monster', 'what', 'scared', 'ohhh']
};

/**
 *  EVENT LISTENERS
 */
document.querySelector('.general__container').addEventListener("click", clickListeners)

/**
 * CLICK CONTROLLER
 */

function clickListeners(e) {

    switch (e.target.id) {
        case "to-login":
        case "to-login2":
        case "to-start":
            next(e.target)
            break
        case "to-saved":
        case "travel":
        case "animations":
            modal.init(e)
            break
        case "to-create":
            validateForm.init(e)
            break
        case "menu-head":
        case "menu-skin":
        case "menu-topHead":
        case "menu-eyebrow":
        case "menu-eyes":
        case "menu-mouth":
            showMenu(e.target)
            break
        case "menu-random":
            tempAvatar.random()
            break
        case "clear-avatar":
            tempAvatar.reset()
            break
    }

    if (e.target.dataset.head) {
        tempSelected.avatar.head = e.target.dataset.head
        tempAvatar.init()
    }
    if (e.target.dataset.skin) {
        tempSelected.avatar.skin = e.target.dataset.skin
        tempAvatar.init()
    }
    if (e.target.dataset.topHead) {
        tempSelected.avatar.topHead = e.target.dataset.topHead
        tempAvatar.init()
    }
    if (e.target.dataset.eyebrow) {
        tempSelected.avatar.eyebrow = e.target.dataset.eyebrow
        tempAvatar.init()
    }
    if (e.target.dataset.eyes) {
        tempSelected.avatar.eyes = e.target.dataset.eyes
        tempAvatar.init()
    }
    if (e.target.dataset.mouth) {
        tempSelected.avatar.mouth = e.target.dataset.mouth
        tempAvatar.init()
    }

    if (parseInt(e.target.id) >= 0)
        document.getElementById("saved__preview").innerHTML = savedAvatar[e.target.id].avatar
}

/**
 * Add avatars in header
 */
let avatarsHeader = {
    init: function () {
        this.insert()
    },
    insert: function () {
        let count = 0
        let header = document.querySelector("header")
        let insertAvatar = setInterval(function () {
            let avatarContainer = document.createElement("div")
            avatarContainer.className = "avatar__header"
            avatarContainer.style.transform = "scale(0.35)"
            avatarContainer.innerHTML = savedAvatar[count].avatar
            if (count == 1) avatarContainer.style.left = "48%"
            if (count == 2) avatarContainer.style.left = "42%"
            header.appendChild(avatarContainer)
            count++
            close()
        }, 500)

        function close() {
            if (count >= 3) clearInterval(insertAvatar)
        }
    }
}
avatarsHeader.init()

/**
 * Show sub menu items
 * Receive the menu item clicked as argument.
 * @param {*HTML Element} element 
 */
function showMenu(element) {
    let show = document.querySelector("#show-items")
    show.innerHTML = ""
    switch (element.id) {
        case "menu-head":
            for (let i in menu.head) {
                let li = document.createElement("li")
                li.className = "btn"
                li.dataset.head = menu.head[i]
                li.innerText = menu.head[i]
                show.appendChild(li)
            }
            break
        case "menu-skin":
            for (let i in menu.skin) {
                let li = document.createElement("li")
                li.className = "btn"
                li.dataset.skin = menu.skin[i]
                li.innerText = menu.skin[i]
                show.appendChild(li)
            }
            break
        case "menu-topHead":
            for (let i in menu.topHead) {
                let li = document.createElement("li")
                li.className = "btn"
                li.dataset.topHead = menu.topHead[i]
                li.innerText = menu.topHead[i]
                show.appendChild(li)
            }
            break
        case "menu-eyebrow":
            for (let i in menu.eyebrow) {
                let li = document.createElement("li")
                li.className = "btn"
                li.dataset.eyebrow = menu.eyebrow[i]
                li.innerText = menu.eyebrow[i]
                show.appendChild(li)
            }
            break
        case "menu-eyes":
            for (let i in menu.eyes) {
                let li = document.createElement("li")
                li.className = "btn"
                li.dataset.eyes = menu.eyes[i]
                li.innerText = menu.eyes[i]
                show.appendChild(li)
            }
            break
        case "menu-mouth":
            for (let i in menu.mouth) {
                let li = document.createElement("li")
                li.className = "btn"
                li.dataset.mouth = menu.mouth[i]
                li.innerText = menu.mouth[i]
                show.appendChild(li)
            }
            break
    }

}

/**
 * FORM VALIDATION
 */
let validateForm = {
    init: function (e) {
        e.preventDefault()
        this.data()

        //If an HTML element is received, it displays error message
        if (this.validateInputs()) {
            let element = this.validateInputs()
            this.showError(element.id, "show")

            element.focus()
        } else
            next(e.target)
    },
    data: function () {
        this.regexmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
        //Form data
        this.mail = document.formlogin.fmail
        this.bday = document.formlogin.fbday
        this.sex = document.formlogin.fsex
        this.terms = document.formlogin.faccept
    },
    // validate entries. If they are ok, to save data
    validateInputs: function () {
        //mail
        if (!this.mail.value.length || !this.regexmail.test(this.mail.value)) return this.mail
        this.showError(this.mail.id)
        //bday
        if (!this.bday.value.length || this.bday.value.length < 10 || this.bday.value.length > 10) return this.bday
        if (!this.validateDate(this.bday.value)) return this.bday
        this.showError(this.bday.id)
        //sex
        if (!this.sex[0].checked && !this.sex[1].checked) return this.sex[1]
        this.showError(this.sex[1].id)
        //terms and conditions
        if (!this.terms.checked) return this.terms
        this.showError(this.terms.id)
        // save data
        tempSelected.info.mail = this.mail.value
        tempSelected.info.bday = this.bday.value
        tempSelected.info.sex = this.sex[0].checked ? this.sex[0].value : this.sex[1].value
        document.formlogin.reset() //clear form
        return false
    },
    validateDate: function (bday) {
        let arrbday = bday.split(/(\/|\-|\.)/);
        let d = arrbday[0];
        let m = arrbday[2];
        let y = arrbday[4];
        return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
    },
    showError: function (id, show) {
        let label = document.querySelectorAll("label[for=" + id + "]")[1]

        if (label.style.display === "block") label.style.display = "none"
        if (show) label.style.display = "block"
    }
}

/**
 * Show saved Avatars in "saved section"
 */
function showSaved() {
    let itemsContainer = document.getElementById("saved-items")
    itemsContainer.innerHTML = "" // Clear previous list
    for (let i = 0; i < savedAvatar.length; i++) {
        let li = document.createElement("li")
        li.id = i
        li.className = "btn"
        li.title = savedAvatar[i].name + " - " + savedAvatar[i].mail
        let content = '<p>Name: ' + savedAvatar[i].name + '</p>' +
            '<p>Created: ' + savedAvatar[i].created + "</p>" +
            '<p>Author: ' + savedAvatar[i].mail + "</p>"
        li.innerHTML = content
        itemsContainer.insertAdjacentElement('afterbegin', li)
    }
    // Show latest Avatar (current)
    document.getElementById("saved__preview").innerHTML = savedAvatar[(savedAvatar.length - 1)].avatar
}

/**
 * Go to next section while the preload transition is running
 * Receives the event trigger as reference.
 * @param {*HTML Trigger} current 
 */
function next(current) {
    preload.init()
    setTimeout(function () {
        switch (current.id) {
            case "to-login":
                document.querySelector('#start').style.display = "none"
                document.querySelector('#login').style.display = "block"
                break
            case "to-create":
                document.querySelector('#login').style.display = "none"
                document.querySelector('#create').style.display = "block"
                break
            case "to-saved":
                document.querySelector('#create').style.display = "none"
                document.querySelector('#saved').style.display = "block"
                break
            case "to-login2":
                document.querySelector('#saved').style.display = "none"
                document.querySelector('#login').style.display = "block"
                tempAvatar.reset()
                break
            case "to-start":
                document.querySelector('#saved').style.display = "none"
                document.querySelector('#start').style.display = "block"
                tempAvatar.reset()
                break
        }
    }, 1300)
}

/**
 * PRELOAD ANIMATION
 */
let preload = {
    init: function () {
        this.data()
        this.start()
    },
    data: function () {
        this.container = document.querySelector('#preload')
        this.avatarContainer = document.createElement('div')
        this.body = document.getElementsByTagName('body')[0]
    },
    start: function () {
        this.container.className = "preload"
        this.avatarContainer.className = 'preload__animation'
        this.container.appendChild(this.avatarContainer)
        this.body.style.overflow = 'hidden' // [IE] about offset
        this.finish()

        // Wait 8ms to insert avatars
        setTimeout(function () {
            document.querySelector('.preload__animation').innerHTML =
                savedAvatar[(Math.floor(Math.random() * (savedAvatar.length)))].avatar +
                savedAvatar[(Math.floor(Math.random() * (savedAvatar.length)))].avatar
            document.querySelector('.preload__animation').style.left = "-120%"
        }, 800)
        //Wait 3s to remove style attribute and clear the preload content
        setTimeout(function () {
            document.querySelector('.preload__animation').removeAttribute('style')
            document.querySelector('.preload__animation').innerHTML = ''
        }, 3000)
    },
    finish: function () {
        let cont = this.container
        setTimeout(function () {
            cont.removeAttribute('class')
            document.querySelector('.preload__animation').parentElement.innerHTML = ""
            document.querySelector('body').style.overflow = 'auto' // [IE] about offset
        }, 3500)
    }
}

/**
 * Temporary avatar controller and avatar save
 */
let tempAvatar = {
    init: function () {
        this.current()
        this.render()
    },
    random: function () {
        //Create an show Random Avatar
        for (let option in menu) {
            tempSelected.avatar[option] = menu[option][(Math.floor(Math.random() * (menu[option].length)))]
        }
        this.current()
        this.render()
    },
    current: function () { // assigns selected values
        this.head = tempSelected.avatar.head
        this.skin = tempSelected.avatar.skin
        this.topHead = tempSelected.avatar.topHead
        this.eyebrow = tempSelected.avatar.eyebrow
        this.eyes = tempSelected.avatar.eyes
        this.mouth = tempSelected.avatar.mouth
    },
    reset: function () { // Clear selecte values and preview
        for (let option in menu) {
            tempSelected.avatar[option] = ""
        }
        this.head = ""
        this.skin = ""
        this.topHead = ""
        this.eyebrow = ""
        this.eyes = ""
        this.mouth = ""
        document.querySelector("#create-preview").innerHTML = ""
    },
    render: function () {
        // Fill the avatar with selected values
        let currentAvatar = '<div class="avatar">' +
            '<div class="head ' + this.skin + ' ' + this.head + '">' +
            '<div class="topHead">' +
            '<div class="hair ' + this.topHead + '"></div></div>' +
            '<div class="eyebrow ' + this.eyebrow + '"><span></span><span></span></div>' +
            '<div class="eyes">' +
            '<div class="eye left ' + this.eyes + '">' +
            '<div class="pupil"></div></div>' +
            '<div class="eye right  ' + this.eyes + '">' +
            '<div class="pupil"></div></div></div>' +
            '<div class="mouth__container">' +
            '<div class="mouth ' + this.mouth + '"><div class="teeth">' +
            '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>' +
            '</div></div></div></div></div>'

        document.querySelector("#create-preview").innerHTML = currentAvatar // show avatar

        return currentAvatar
    },
    currentDate: function () {
        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }
        var d = new Date()
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    },
    save: function () {
        // Add current avatar to saved avatars list
        savedAvatar.push({
            name: tempSelected.info.name,
            mail: tempSelected.info.mail,
            bday: tempSelected.info.bday,
            sex: tempSelected.info.sex,
            created: this.currentDate(),
            avatar: this.render()
        })
    }
}

/**
 * Create and display modal windows
 */
let modal = {
    /**
     * If you want to save the selected avatar, a name will be requested. 
     * The Avatar will be saved and the list of saved Avatars will be accessed
     *
     * @param {*} event 
     */
    init: function (event) {

        this.createModal(event.target)
    },
    /**
     * Generate the window based on the event trigger
     * @param {*HTML Element } scope  -> Trigger
     */
    createModal: function (eventTarget) {
        this.modal = document.createElement("div")
        this.modal.className = "dialog"
        switch (eventTarget.id) {
            case "to-saved":
                //If the avatar is not complete, the save is canceled
                if (!tempSelected.avatar.head.length || !tempSelected.avatar.eyes.length || !tempSelected.avatar.mouth.length) {
                    this.modal.innerHTML = this.modalComplete()
                    this.dialogContainer = document.getElementById("dialogCreate")
                    this.dialogContainer.appendChild(this.modal)
                    this.actionsName(eventTarget)
                    return
                }
                this.modal.innerHTML = this.modalName()
                this.dialogContainer = document.getElementById("dialogCreate")
                this.dialogContainer.appendChild(this.modal)
                this.actionsName(eventTarget)
                break
            case "travel":
                this.modal.innerHTML = this.modalTravel()
                this.dialogContainer = document.getElementById("dialogSaved")
                this.dialogContainer.appendChild(this.modal)
                this.actionsSaved()
                break
            case "animations":
                this.modal.innerHTML = this.modalAnimations()
                this.dialogContainer = document.getElementById("dialogSaved")
                this.dialogContainer.appendChild(this.modal)
                this.actionsSaved()
                break

        }
    },
    modalName: function () {
        return '<div class=" dialog__left dialog__form">' +
            '<div><h3>What\'s my name???</h3>' +
            '<form method="/">' +
            '<label for="nameDialog">Enter a name</label>' +
            '<input type="text" id="nameDialog">' +
            '<button id="cancelDialog" class="btn" type="reset">Cancel</button>' +
            '<button type="submit" id="confirmDialog" class="btn">Confirm</button>' +
            '</form></div></div>' +
            '<div class="dialog__right dialog__avatar">' + tempAvatar.render() + '</div>'
    },
    modalComplete: function () {
        return '<div class=" dialog__left dialog__form">' +
            '<div><h3>HEY!!!</h3>' +
            '<p>Do I have eyes?</p><p>Do I have a mouth?</p><br>' +
            '<button id="cancelDialog" class="btn" type="reset">Back</button>' +
            '</div></div>' +
            '<div class="dialog__right dialog__avatar">' + tempAvatar.render() + '</div>'
    },
    modalTravel: function () {
        return '<div id="closeDialog" class="close__dialog">x</div>' +
            '<div id="dialog__avatar" class="dialog__left dialog__avatar">' + document.getElementById("saved__preview").innerHTML + '</div>' +
            '<div class=" dialog__right dialog__travel">' +
            '<div><h3>Go to...</h3>' +
            '<input id="paris" class="btn" type="button" value="Paris">' +
            '<input id="sahara" class="btn" type="button" value="Sahara">' +
            '<input id="roma" class="btn" type="button" value="Roma">' +
            '</div></div>'
    },
    modalAnimations: function () {
        return '<div id="closeDialog" class="close__dialog">x</div>' +
            '<div id="dialog__avatar" class="dialog__left dialog__avatar">' + document.getElementById("saved__preview").innerHTML + '</div>' +
            '<div class=" dialog__right dialog__animations">' +
            '<div><h3>Press...</h3>' +
            '<input id="eye" class="btn" type="button" value="Eyes or 1">' +
            '<input id="mouth" class="btn" type="button" value="mouth or 2">' +
            '<input id="head" class="btn" type="button" value="Jump or 3">' +
            '</div></div>'
    },
    actionsName: function (elem) {
        let body = document.querySelector('body')
        let dialogContainer = this.dialogContainer
        let name = document.getElementById("nameDialog")
        dialogContainer.style.display = "block"
        body.style.overflow = "hidden"

        if (document.getElementById("confirmDialog")) {
            document.getElementById("confirmDialog").onclick = function (e) {
                e.preventDefault()
                tempSelected.info.name = name.value ? name.value : "Anonymous" // Save name or Anonymous if name is empty
                dialogContainer.style.display = "none"
                dialogContainer.innerHTML = ""
                body.style.overflow = "auto"
                tempAvatar.save() // Save avatar
                showSaved() // Load saved list
                next(elem) // Go to saved section
            }
        }

        // Close dialog on Cancel
        document.getElementById("cancelDialog").onclick = function (e) {
            dialogContainer.style.display = "none"
            dialogContainer.innerHTML = ""
            body.style.overflow = "auto"
            return
        }
    },
    actionsSaved: function () {
        let stopeye
        let stopmouth
        let stophead
        let body = document.querySelector('body')
        let dialogContainer = this.dialogContainer
        let avatarContainer = document.getElementById("dialog__avatar")
        let avatar = document.querySelector(".dialog__avatar .avatar")
        let eye = document.querySelectorAll(".dialog__avatar .avatar .eye")
        let mouth = document.querySelector(".dialog__avatar .avatar .mouth")
        let head = document.querySelector(".dialog__avatar .avatar .head")

        dialogContainer.style.display = "block"
        body.style.overflow = "hidden"

        // Show photos and change the position of the avatar
        dialogContainer.addEventListener("click", function (e) {
            switch (e.target.id) {
                case "paris":
                    avatarContainer.style.backgroundImage = "url(./src/img/paris.jpg)"
                    avatar.style.cssText = "margin-right: -120px; margin-top: 150px;" +
                        "transform: scale(0.8) rotate(-15deg);"
                    break
                case "sahara":
                    avatarContainer.style.backgroundImage = "url(./src/img/sahara.jpg)"
                    avatar.style.cssText = "margin-right: 40px; margin-top: -95px;" +
                        "transform: scale(0.3) skew(-10deg) rotateY(-45deg);"
                    break
                case "roma":
                    avatarContainer.style.backgroundImage = "url(./src/img/roma.jpg)"
                    avatar.style.cssText = "margin-right: 200px; margin-top: 140px;" +
                        "transform: scale(0.5);"
                    break
                    /**
                     * ANIMATIONS
                     * Add class animate and remove class after 2.5s
                     */
                case "eye":
                    if (stopeye) {
                        clearTimeout(stopeye)
                    }
                    eye[0].className += " animate"
                    eye[1].className += " animate"
                    stopeye = setTimeout(function () {
                        eye[0].className = eye[0].className.split(" animate").join("")
                        eye[1].className = eye[1].className.split(" animate").join("")
                    }, 2500);
                    break
                case "mouth":
                    if (stopmouth) {
                        clearTimeout(stopmouth)
                    }
                    mouth.className += " animate"
                    stopmouth = setTimeout(function () {
                        mouth.className = mouth.className.split(" animate").join("")
                    }, 2500);
                    break
                case "head":
                    if (stophead) {
                        clearTimeout(stophead)
                    }
                    head.className += " animate"
                    stophead = setTimeout(function () {
                        head.className = head.className.split(" animate").join("")
                    }, 2500);
                    break
                case "closeDialog":
                    dialogContainer.style.display = "none"
                    dialogContainer.innerHTML = ""
                    body.style.overflow = "auto"
                    break
            }
        })
        /**
         * KEYBOARD ANIMATIONS
         */
        document.onkeyup = function (e) {
            switch (e.keyCode) {
                case 49:
                case 97:
                    if (stopeye) {
                        clearTimeout(stopeye)
                    }
                    eye[0].className += " animate"
                    eye[1].className += " animate"
                    stopeye = setTimeout(function () {
                        eye[0].className = eye[0].className.split(" animate").join("")
                        eye[1].className = eye[1].className.split(" animate").join("")
                    }, 2500);
                    break
                case 50:
                case 98:
                    if (stopmouth) {
                        clearTimeout(stopmouth)
                    }
                    mouth.className += " animate"
                    stopmouth = setTimeout(function () {
                        mouth.className = mouth.className.split(" animate").join("")
                    }, 2500);
                    break
                case 51:
                case 99:
                    if (stophead) {
                        clearTimeout(stophead)
                    }
                    head.className += " animate"
                    stophead = setTimeout(function () {
                        head.className = head.className.split(" animate").join("")
                    }, 2500);
                    break
            }

        }
        avatarContainer.onmouseover = function (e) {
            if (stopmouth) {
                clearTimeout(stopmouth)
            }
            mouth.className += " animate"
            stopmouth = setTimeout(function () {
                mouth.className = mouth.className.split(" animate").join("")
            }, 2500);
        } //end onmouseover
    } // end actionsSaved
} // end modal object

/**
 * Array that saves created avatars
 */
let savedAvatar = [{
        name: "Pedro",
        mail: "pedro@aaa.com",
        bday: "23/07/1990",
        sex: "Male",
        created: "01/05/2020",
        avatar: '<div class="avatar">' +
            '<div class="head red four">' +
            '<div class="topHead">' +
            '<div class="hair punk"></div></div>' +
            '<div class="eyebrow fine"><span></span><span></span></div>' +
            '<div class="eyes">' +
            '<div class="eye left square">' +
            '<div class="pupil"></div></div>' +
            '<div class="eye right square">' +
            '<div class="pupil"></div></div></div>' +
            '<div class="mouth__container">' +
            '<div class="mouth simple"><div class="teeth">' +
            '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>' +
            '</div></div></div></div></div>'
    },
    {
        name: "Foo",
        mail: "foo@aaa.com",
        bday: "23/07/1990",
        sex: "Female",
        created: "01/05/2020",
        avatar: '<div class="avatar">' +
            '<div class="head violet one">' +
            '<div class="topHead">' +
            '<div class="hair hat"></div></div>' +
            '<div class="eyebrow fine"><span></span><span></span></div>' +
            '<div class="eyes">' +
            '<div class="eye left crazy">' +
            '<div class="pupil"></div></div>' +
            '<div class="eye right crazy">' +
            '<div class="pupil"></div></div></div>' +
            '<div class="mouth__container">' +
            '<div class="mouth happy"><div class="teeth">' +
            '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>' +
            '</div></div></div></div></div>'
    },
    {
        name: "Hulk",
        mail: "aaa@aaa.com",
        bday: "15/05/1986",
        sex: "Male",
        created: "01/05/2020",
        avatar: '<div class="avatar">' +
            '<div class="head green two">' +
            '<div class="topHead">' +
            '<div class="hair red-horns"></div></div>' +
            '<div class="eyebrow thicker"><span></span><span></span></div>' +
            '<div class="eyes">' +
            '<div class="eye left bigger">' +
            '<div class="pupil"></div></div>' +
            '<div class="eye right bigger">' +
            '<div class="pupil"></div></div></div>' +
            '<div class="mouth__container">' +
            '<div class="mouth monster"><div class="teeth">' +
            '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>' +
            '</div></div></div></div></div>'
    },
    {
        name: "Lola",
        mail: "lola@aaa.com",
        bday: "23/07/1990",
        sex: "Female",
        created: "01/05/2020",
        avatar: '<div class="avatar">' +
            '<div class="head purple three">' +
            '<div class="topHead">' +
            '<div class="hair"></div></div>' +
            '<div class="eyebrow fine"><span></span><span></span></div>' +
            '<div class="eyes">' +
            '<div class="eye left chinese">' +
            '<div class="pupil"></div></div>' +
            '<div class="eye right chinese">' +
            '<div class="pupil"></div></div></div>' +
            '<div class="mouth__container">' +
            '<div class="mouth scared"><div class="teeth">' +
            '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>' +
            '</div></div></div></div></div>'
    },
    {
        name: "Luis",
        mail: "luis@aaaaaaaaaaaaaa.com",
        bday: "23/07/1990",
        sex: "Male",
        created: "01/05/2020",
        avatar: '<div class="avatar">' +
            '<div class="head orange two">' +
            '<div class="topHead">' +
            '<div class="hair punk"></div></div>' +
            '<div class="eyebrow fine"><span></span><span></span></div>' +
            '<div class="eyes">' +
            '<div id="eye1" class="eye left smaller">' +
            '<div class="pupil"></div></div>' +
            '<div class="eye right smaller">' +
            '<div class="pupil"></div></div></div>' +
            '<div class="mouth__container">' +
            '<div class="mouth simple"><div class="teeth">' +
            '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>' +
            '</div></div></div></div></div>'
    }
]
