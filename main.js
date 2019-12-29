//raxx 
(function (g, j) {
    "function" == typeof define && define.amd ? define([], function () {
        return j(g)
    }) : "object" == typeof exports ? module.exports = j(g) : g.va = j(g)
})("undefined" == typeof global ? "undefined" == typeof window ? this : window : global, function (g) {
    "use strict";
    var B, j = {}
        , k = g
        , w = document
        , z = w.documentElement
        , A = w.body
        , C = Object.prototype.toString;
    j.isObject = function (P) {
        return "[object Object]" === C.call(P)
    }, j.isArray = function (P) {
        return "[object Array]" === C.call(P)
    }, j.isBoolean = function (P) {
        return "[object Boolean]" === C.call(P)
    }, j.isString = function (P) {
        return "[object String]" === C.call(P)
    }, j.isFunction = function (P) {
        return "[object Function]" === C.call(P)
    }, j.isUndefined = function (P) {
        return "undefined" == typeof P
    }, j.isNull = function (P) {
        return null === P
    }, j.isNil = function (P) {
        return j.isUndefined(P) || j.isNull(P)
    }, j.ifUndefined = function (P) {
        return "undefined" != typeof P
    }, j.ifNull = function (P) {
        return null !== P
    }, j.ifNil = function (P) {
        return j.ifUndefined(P) && j.ifNull(P)
    }, j.isElement = function (P) {
        return "object" == typeof HTMLElement ? P instanceof HTMLElement : P && "object" == typeof P && 1 === P.nodeType && "string" == typeof P.nodeName
    }, j.isNode = function (P) {
        return "object" == typeof Node ? P instanceof Node : P && "object" == typeof P && "number" == typeof P.nodeType && "string" == typeof P.nodeName
    }, j.isLiteralObject = function (P) {
        return P && "object" == typeof P && Object.getPrototypeOf(P) === Object.getPrototypeOf({})
    }, j.isIterable = function (P) {
        if (j.isNode(P) || j.isElement(P) || P === k) return !1;
        var Q = j.isLiteralObject(P) || j.isArray(P) || "object" == typeof P && null !== P && void 0 !== P.length;
        return Q
    }, j.type = function (P) {
        return C.call(P)
    }, j.hasProperty = function (P, Q) {
        return Object.prototype.hasOwnProperty.call(P, Q)
    }, j.extend = function () {
        var P = {}
            , Q = !1
            , R = 0;
        j.isBoolean(arguments[0]) && (Q = arguments[0], R++);
        for (var S = function (T) {
                for (var U in T) T.hasOwnProperty(U) && (P[U] = Q && j.isObject(T[U]) ? j.extend(P[U], T[U]) : T[U])
            }; R < arguments.length; R++) S(arguments[R]);
        return P
    }, j.each = function (P, Q, R) {
        if (j.isObject(P))
            for (var S in P) j.hasProperty(P, S) && Q.call(R, P[S], S, P);
        else
            for (var T = P.length, U = 0; U < T; U++) Q.call(R, P[U], U, P)
    }, j.encodeURL = function (P) {
        return encodeURIComponent(P)
    }, j.on = function (P, Q, R, S) {
        if (S && (R = R.bind(S)), !P) throw new Error("Please provide an element to attach the event to.");
        if (!Q) throw new Error("Please provide an event to listen for.");
        return j.isString(P) ? w.addEventListener(P, Q, R || !1) : P.addEventListener(Q, R, S || !1)
    }, j.off = function (P, Q, R, S) {
        if (S && (R = R.bind(S)), !P) throw new Error("Please provide an element to attach the event to.");
        if (!Q) throw new Error("Please provide an event to listen for.");
        return j.isString(P) ? w.removeEventListener(P, Q, R || !1) : P.removeEventListener(Q, R, S || !1)
    }, j.passive = function () {
        var P = !1;
        try {
            var Q = Object.defineProperty({}, "passive", {
                get: function () {
                    P = !0
                }
            });
            j.on(k, "test", null, Q), j.off(k, "test", null, Q)
        } catch (R) {
            P = !1
        }
        return P
    }, j.ready = function (P) {
        return "interactive" === w.readyState || "complete" === w.readyState ? void P() : void j.on("DOMContentLoaded", function Q() {
            P(), j.off("DOMContentLoaded", Q, !1)
        }, !1)
    }, j.loaded = function (P) {
        return "complete" === w.readyState ? void P() : void j.on(k, "load", function Q() {
            P(), j.off("load", Q, !1)
        }, !1)
    }, j.query = j.$ = function (P, Q) {
        return j.isString(P) ? w.querySelector(P) : P.querySelector(Q)
    }, j.queryAll = j.$$ = function (P, Q) {
        return j.isString(P) ? w.querySelectorAll(P) : P.querySelectorAll(Q)
    }, j.byId = function (P) {
        return w.getElementById(P)
    }, j.byClass = function (P, Q) {
        return j.isString(P) ? w.getElementsByClassName(P) : P.getElementsByClassName(Q)
    }, j.byTag = function (P, Q) {
        return j.isString(P) ? w.getElementsByTagName(P) : P.getElementsByTagName(Q)
    }, j.getAttr = function (P, Q) {
        return P.getAttribute(Q)
    }, j.setAttr = function (P, Q, R) {
        return P.setAttribute(Q, R)
    }, j.removeAttr = function (P, Q) {
        return P.removeAttribute(Q)
    }, j.hasAttr = function (P, Q) {
        return P.hasAttribute(Q)
    }, j.findAttr = function (P, Q, R) {
        R = R || "*";
        var S = j.byTag(R)
            , T = S.length;
        for (B = 0; B < T; B++)
            if (j.getAttr(S[B], P) == Q) return S[B]
    }, j.html = function (P, Q) {
        return Q ? (P.innerHTML = Q, Q) : P.innerHTML
    }, j.text = function (P, Q) {
        return Q ? (P.innerText ? P.innerText = Q : P.textContent = Q, Q) : P.innerText ? P.innerText : P.textContent
    }, j.children = function (P, Q) {
        if (j.isBoolean(Q) && Q) return P.childNodes;
        var R = [];
        if (j.isString(Q)) {
            var S = P.childNodes;
            return j.each(S, function (T) {
                T.nodeName.toLowerCase() === Q.toLowerCase() && R.push(T)
            }), R
        }
        for (B in P.childNodes) 1 === P.childNodes[B].nodeType && R.push(P.childNodes[B]);
        return R
    }, j.create = function (P) {
        var Q = document.createElement("tbody")
            , R = document.createDocumentFragment();
        j.html(Q, P);
        var S = j.children(Q);
        return j.each(S, function (T) {
            j.append(R, T)
        }), R
    }, j.append = function (P, Q) {
        return j.isString(Q) && (Q = j.create(Q)), P.appendChild(Q), Q
    }, j.remove = function (P) {
        var Q = P.parentNode || P.parentElement;
        Q && Q.removeChild(P)
    }, j.htmlAfterBegin = function (P, Q) {
        return P.insertAdjacentHTML("afterbegin", Q)
    }, j.htmlBeforeEnd = function (P, Q) {
        return P.insertAdjacentHTML("beforeend", Q)
    }, j.getStyle = function (P, Q) {
        var R;
        return R = j.isFunction(k.getComputedStyle) ? k.getComputedStyle(P) : j.ifUndefined(w.currentStyle) ? P.currentStyle : P.style, Q ? R[Q] : R
    };
    var D = function (P) {
        return P
    };
    j.setStyle = function (P, Q) {
        if (j.isIterable(P) && j.isLiteralObject(Q)) return j.each(P, function (S) {
            j.css(S, Q)
        }), v;
        if (j.isString(Q)) return j.getStyle(P, D(Q));
        if (j.isArray(Q)) {
            var R = {};
            for (B in Q) R[Q[B]] = j.getStyle(P, D(Q[B]));
            return R
        }
        if (j.isLiteralObject(Q)) {
            for (B in Q) P.style[D(B)] = Q[B];
            return Q
        }
        return !1
    }, j.rect = function (P) {
        return P.getBoundingClientRect()
    }, j.offset = function (P) {
        if (!j.isElement(P)) return !1;
        var Q = j.rect(P)
            , R = {
                top: Math.round(Q.top)
                , right: Math.round(Q.right)
                , bottom: Math.round(Q.bottom)
                , left: Math.round(Q.left)
                , width: Q.width ? Math.round(Q.width) : Math.round(P.offsetWidth)
                , height: Q.height ? Math.round(Q.height) : Math.round(P.offsetHeight)
            };
        return 0 >= R.width && (R.width = parseFloat(j.getStyle(P, "width"))), 0 >= R.height && (R.height = parseFloat(j.getStyle(P, "height"))), R
    }, j.elementHeight = function (P) {
        return j.offset(P)
            .height
    }, j.scrollTop = function () {
        return k.pageYOffset || k.scrollY || z.scrollTop || A.scrollTop
    }, j.documentHeight = function () {
        return Math.max(A.scrollHeight, z.scrollHeight, A.offsetHeight, z.offsetHeight, A.clientHeight, z.clientHeight)
    };
    var E = k.matchMedia || k.webkitMatchMedia || k.mozMatchMedia || k.msMatchMedia || k.oMatchMedia;
    j.matchMedia = function (P) {
        return E(P)
    }, j.matches = function (P, Q) {
        var R = Element.prototype
            , S = R.matches || R.matchesSelector || R.webkitMatchesSelector || R.mozMatchesSelector || R.msMatchesSelector || R.oMatchesSelector || function (T) {
                return -1 !== [].indexOf.call(w.querySelectorAll(T), this)
            };
        return S.call(P, Q)
    }, j.once = function (P, Q) {
        var R;
        return function () {
            return P && (R = P.apply(Q || this, arguments), P = null), R
        }
    }, j.timeout = function (P, Q) {
        return setTimeout(P, Q)
    }, j.throttle = function (P, Q, R) {
        var S;
        return function () {
            var T = this
                , U = arguments
                , W = R && !S;
            S || (S = setTimeout(function () {
                S = null, R || P.apply(T, U)
            }, Q)), W && P.apply(T, U)
        }
    };
    var F, H = k.requestAnimationFrame
        , I = k.cancelAnimationFrame || k.cancelRequestAnimationFrame;
    H && I || j.each(["-moz-", "-ms-", "-webkit-", "-o-", ""], function (P) {
        var Q = P;
        H = H || k[Q + "RequestAnimationFrame"], I = I || k[Q + "CancelAnimationFrame"] || k[Q + "CancelRequestAnimationFrame"]
    }), H && I || (H = function (P) {
        var Q = new Date()
            .getTime()
            , R = Math.max(0, 16 - (Q - F))
            , S = k.setTimeout(function () {
                P(Q + R)
            }, R);
        return F = Q + R, S
    }, I = function (P) {
        k.clearTimeout(P)
    }), j.raf = function (P) {
        return H(P)
    }, j.caf = function (P) {
        return H(P)
    }, j.touch = function () {
        return "ontouchstart" in k || k.DocumentTouch && w instanceof DocumentTouch
    }, String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    });
    var J, K, L, M, N = function (P, Q) {
        "[object Array]" !== j.type(P) && (P = P.split(" "));
        var R = P.length;
        for (B = 0; B < R; B++) Q(P[B], B)
    };
    "classList" in z ? (J = function (P, Q) {
        return P.classList.contains(Q)
    }, K = function (P, Q) {
        P.classList.add(Q)
    }, L = function (P, Q) {
        P.classList.remove(Q)
    }, M = function (P, Q) {
        P.classList.toggle(Q)
    }) : (J = function (P, Q) {
        return new RegExp("(^|\\s)" + Q + "(\\s|$)")
            .test(P.className)
    }, K = function (P, Q) {
        J(P, Q) || (P.className += (P.className ? " " : "") + Q)
    }, L = function (P, Q) {
        if (J(P, Q)) {
            var R = new RegExp("(\\s|^)" + Q + "(\\s|$)");
            P.className = P.className.replace(R, " "), P.className = P.className.trim()
        }
    }, M = function (P, Q) {
        (J(P, Q) ? L : K)(P, Q)
    }), j.hasClass = function (P, Q) {
        return J(P, Q)
    }, j.addClass = function (P, Q) {
        N(Q, function (R) {
            K(P, R)
        })
    }, j.removeClass = function (P, Q) {
        N(Q, function (R) {
            L(P, R)
        })
    }, j.toggleClass = function (P, Q) {
        N(Q, function (R) {
            M(P, R)
        })
    };
    var O = function (Q) {
        return Q.getAttribute("class")
    };
    return j.$hasClass = function (P, Q) {
        return new RegExp("(\\s|^)" + Q + "(\\s|$)")
            .test(O(P))
    }, j.$addClass = function (P, Q) {
        j.$hasClass(P, Q) || P.setAttribute("class", (O(P) && O(P) + " ") + Q)
    }, j.$removeClass = function (P, Q) {
        var R = O(P)
            .replace(new RegExp("(\\s|^)" + Q + "(\\s|$)", "g"), "$2");
        j.$hasClass(P, Q) && P.setAttribute("class", R)
    }, j.$toggleClass = function (P, Q) {
        (j.$hasClass(P, Q) ? j.$removeClass : j.$addClass)(P, Q)
    }, j
});
(function (g, j) {
    "use strict";
    var z, A, B, C, k = j.documentElement
        , w = j.body;
    if (B = "era-material", C = "1.1", va.findAttr("data-templateName", B) && va.findAttr("data-templateVersion", C)) {
        function G(H, I) {
            try {
                if (va.isString(H)) {
                    var J = (I || j)
                        .querySelectorAll(H)
                        , K = J.length;
                    for (z = 0; z < K; z++) this[z] = J[z];
                    this.length = K
                } else H && 1 === H.nodeType ? (this[0] = H, this.length = 1) : this.length = 0
            } catch (L) {
                console.error(L.message)
            }
        }
        console.log("Finished initializing shop template."), k && va.removeClass(k, "no-js");
        var D = function () {
            if (! function () {
                    return "undefined" != typeof Storage
                }()) throw new Error("Your browser does not support HTML5 localStorage. Please upgrade your browser!");
            else {
                var J = function () {
                    var M = va.query("[data-night-mode] svg")
                        , N = va.query(M, ".is-night")
                        , O = va.query(M, ".is-light");
                    if (localStorage.getItem("nightMode") && localStorage.getItem("toggleNight") && localStorage.getItem("toggleLight")) {
                        var P = localStorage.getItem("nightMode")
                            , Q = localStorage.getItem("toggleNight")
                            , R = localStorage.getItem("toggleLight");
                        va.addClass(w, P), va.$toggleClass(N, Q), va.$toggleClass(O, R)
                    }
                    va.on("click", function (S) {
                        va.hasAttr(S.target, "data-night-mode") && (S.preventDefault(), va.hasClass(w, "night-mode") || localStorage.setItem("nightMode", "night-mode") && va.$hasClass(N, "hidden") || localStorage.setItem("toggleNight", "hidden") && va.$hasClass(O, "hidden") || localStorage.setItem("toggleLight", "hidden") ? (va.removeClass(w, "night-mode"), localStorage.removeItem("nightMode"), localStorage.removeItem("toggleNight"), va.$addClass(N, "hidden"), va.$removeClass(O, "hidden"), localStorage.removeItem("toggleLight")) : (va.addClass(w, "night-mode"), localStorage.setItem("nightMode", "night-mode"), localStorage.setItem("toggleNight", "hidden"), va.$removeClass(N, "hidden"), va.$addClass(O, "hidden"), localStorage.setItem("toggleLight", "hidden")))
                    }, !1)
                };
                J();
                var K = function () {
                    var M = va.query("[data-rtl-mode] svg")
                        , N = va.query(M, ".is-rtl")
                        , O = va.query(M, ".is-ltr");
                    if ("ltr" == j.dir) {
                        if (localStorage.getItem("RTL") && localStorage.getItem("toggleRTL") && localStorage.getItem("toggleLTR")) {
                            var P = localStorage.getItem("RTL")
                                , Q = localStorage.getItem("toggleRTL")
                                , R = localStorage.getItem("toggleLTR");
                            va.addClass(k, P), va.$toggleClass(N, Q), va.$toggleClass(O, R)
                        }
                        va.on("click", function (T) {
                            va.hasAttr(T.target, "data-rtl-mode") && (T.preventDefault(), va.hasClass(k, "rtl") || localStorage.setItem("RTL", "rtl") && va.$hasClass(N, "hidden") || localStorage.setItem("toggleRTL", "hidden") && va.$hasClass(O, "hidden") || localStorage.setItem("toggleLTR", "hidden") ? (va.removeClass(k, "rtl"), localStorage.removeItem("RTL"), localStorage.removeItem("toggleRTL"), va.$addClass(N, "hidden"), va.$removeClass(O, "hidden"), localStorage.removeItem("toggleLTR")) : !va.hasClass(k, "translated-rtl") && (va.addClass(k, "rtl"), localStorage.setItem("RTL", "rtl"), localStorage.setItem("toggleRTL", "hidden"), va.$removeClass(N, "hidden"), va.$addClass(O, "hidden"), localStorage.setItem("toggleLTR", "hidden")))
                        }, !1)
                    }(function () {
                        "rtl" == j.dir && (va.$hasClass(N, "hidden") && (va.$removeClass(N, "hidden"), va.$addClass(O, "hidden")), va.on("click", function (U) {
                            va.hasAttr(U.target, "data-rtl-mode") && (U.preventDefault(), !va.hasClass(k, "translated-rtl") && va.$hasClass(O, "hidden") ? (va.setAttr(k, "dir", "ltr"), va.$removeClass(O, "hidden"), va.$addClass(N, "hidden")) : "ltr" == j.dir && va.$hasClass(N, "hidden") && (va.setAttr(k, "dir", "rtl"), va.$removeClass(N, "hidden"), va.$addClass(O, "hidden")))
                        }, !1))
                    })()
                };
                K()
            }
        };
        D(), va.ready(function () {
            var H = va.byId("app")
                , I = va.byId("toolbar")
                , J = va.byId("drawer");
            (function () {
                va.htmlBeforeEnd(H, "<div id=\"overlay\"></div>")
            })();
            var K = va.byId("overlay");
            (function () {
                var ca = new Date
                    , da = ca.getFullYear()
                    , fa = va.byId("copyright-years");
                va.html(fa, da)
            })();
            (function () {
                var ca = function (ha) {
                        var ia = ha.type;
                        "keydown" === ia ? (13 === ha.keyCode || 32 === ha.keyCode) && (g.print(), ha.preventDefault()) : "click" === ia && g.print()
                    }
                    , da = va.byClass("js-print")[0];
                va.ifUndefined(da) && (va.on(da, "click", ca, !1), va.on(da, "keydown", ca, !1))
            })();
            (function () {
                var ca = Element.prototype;
                ca.requestFullscreen || (ca.requestFullscreen = ca.mozRequestFullscreen || ca.webkitRequestFullscreen || ca.msRequestFullscreen), j.exitFullscreen || (j.exitFullscreen = j.mozExitFullscreen || j.webkitExitFullscreen || j.msExitFullscreen), j.fullscreenElement || (Object.defineProperty(j, "fullscreenElement", {
                    get: function () {
                        return j.mozFullScreenElement || j.msFullscreenElement || j.webkitFullscreenElement
                    }
                }), Object.defineProperty(j, "fullscreenEnabled", {
                    get: function () {
                        return j.mozFullScreenEnabled || j.msFullscreenEnabled || j.webkitFullscreenEnabled
                    }
                })), va.on("click", function (da) {
                    va.hasAttr(da.target, "data-fullscreen") && (j.fullscreenElement ? j.exitFullscreen() : k.requestFullscreen())
                }, !1)
            })();
            (function () {
                va.each(va.queryAll("li.nav-menu"), function (ca) {
                    var da = va.query(ca, "[data-nav-toggle=\"menu\"]")
                        , fa = va.query(da.parentNode, "ul.nav-item")
                        , ha = va.query(da, ".menu-indicator");
                    if (va.setStyle(fa, {
                            marginTop: -fa.scrollHeight + "px"
                        }), va.ifNil(da)) {
                        var ia = va.throttle(function () {
                            va.toggleClass(fa, "open"), va.ifNull(ha) && va.toggleClass(ha, "open"), va.toggleClass(da, "active"), fa.style.marginTop ? va.setStyle(fa, {
                                marginTop: null
                            }) : va.setStyle(fa, {
                                marginTop: -fa.scrollHeight + "px"
                            })
                        }, 15);
                        va.touch() ? va.on(da, "touchstart", ia, !!va.passive && {
                            passive: !0
                        }) : va.on(da, "click", ia, !1)
                    }
                    va.each(va.queryAll(ca, "[data-nav-toggle=\"submenu\"]"), function (ja) {
                        if (va.ifNil(ja)) {
                            var ka = va.throttle(function () {
                                var la = va.query(ja.parentNode, "ul.nav-sub-menu")
                                    , ma = va.query(ja, ".submenu-indicator");
                                va.toggleClass(la, "open"), va.ifNull(ma) && va.toggleClass(ma, "open"), va.toggleClass(ja, "active"), la.style.maxHeight ? va.setStyle(la, {
                                    maxHeight: null
                                }) : va.setStyle(la, {
                                    maxHeight: la.scrollHeight + "px"
                                })
                            }, 15);
                            va.touch() ? va.on(ja, "touchstart", ka, !!va.passive && {
                                passive: !0
                            }) : va.on(ja, "click", ka, !1)
                        }
                    })
                })
            })();
            var P = function () {
                    va.addClass(w, "lock")
                }
                , Q = function () {
                    va.hasClass(w, "lock") && va.removeClass(w, "lock")
                }
                , R = function () {
                    va.addClass(K, "anim");
                    var ca = va.throttle(function () {
                        va.removeClass(K, "anim"), va.addClass(K, "active"), P()
                    }, 15);
                    va.raf(ca)
                }
                , S = function () {
                    va.hasClass(K, "active") && (va.removeClass(K, "active"), Q())
                };
            (function () {
                va.each(va.queryAll(".js-dialog-open"), function (ca) {
                    va.on(ca, "click", function (da) {
                        var fa = da.target || ca || this
                            , ha = va.getAttr(fa, "data-open-dialog");
                        if (va.addClass(va.byId(ha), "dialog-opening"), va.hasClass(va.byId(ha), "dialog-opening")) {
                            var ia = va.throttle(function () {
                                va.removeClass(va.byId(ha), "dialog-opening"), va.addClass(va.byId(ha), "dialog-open"), P()
                            }, 15);
                            va.raf(ia)
                        }
                    }, !1)
                }), va.each(va.queryAll(".js-dialog-close"), function (ca) {
                    va.on(ca, "click", function (da) {
                        var fa = da.target || ca || this
                            , ha = va.getAttr(fa, "data-close-dialog");
                        va.hasClass(va.byId(ha), "dialog-open") && (va.removeClass(va.byId(ha), "dialog-open"), Q())
                    }, !1)
                }), va.each(va.queryAll(".dialog-scrim"), function (ca) {
                    va.on(ca, "click", function () {
                        va.each(va.queryAll(".dialog"), function (da) {
                            va.hasClass(da, "dialog-open") && (va.removeClass(da, "dialog-open"), Q())
                        })
                    }, !1)
                })
            })();
            (function () {
                va.each(va.queryAll(".js-dropdown-toggle"), function (ca) {
                    va.on(ca, "click", function (da) {
                        da.stopPropagation();
                        var fa = da.target || ca || this
                            , ha = va.getAttr(fa, "data-toggle-dropdown");
                        va.hasClass(va.byId(ha), "active") ? (va.removeClass(va.byId(ha), "active"), va.setAttr(fa, "aria-expanded", "false")) : (va.addClass(va.byId(ha), "active"), va.setAttr(fa, "aria-expanded", "true")), va.on(g, "click", function () {
                            va.hasClass(va.byId(ha), "active") && (va.removeClass(va.byId(ha), "active"), va.setAttr(fa, "aria-expanded", "false"))
                        }, !1)
                    }, !1)
                })
            })();
            (function () {
                (function () {
                    var ha = va.query(".multi-view .js-drawer");
                    if (ha) {
                        var ia = va.throttle(function () {
                            va.addClass(J, "active"), R(), va.hasClass(J, "active") && va.setAttr(ha, "aria-expanded", "true");
                            va.on(K, "click", function () {
                                va.hasClass(J, "active") && (va.removeClass(J, "active"), S(), va.setAttr(ha, "aria-expanded", "false"))
                            }, !1)
                        }, 15);
                        va.on(ha, "click", ia, !1)
                    }
                })();
                (function () {
                    var ha = va.query(".article-view .js-drawer");
                    if (ha) {
                        var ia = va.throttle(function () {
                            va.toggleClass(H, "active"), va.toggleClass(J, "active"), va.hasClass(J, "active") ? va.setAttr(ha, "aria-expanded", "true") : va.setAttr(ha, "aria-expanded", "false")
                        }, 15);
                        va.on(ha, "click", ia, !1)
                    }
                })()
            })();
            (function () {
                var ca = va.byId("toolbar-search")
                    , da = va.byClass("js-search")[0]
                    , fa = va.byClass("toolbar-title")[0]
                    , ha = va.byClass("toolbar-blog-title")[0];
                va.each(va.queryAll(".toolbar-action:not(.js-drawer)"), function (ia) {
                    va.ifNil(da) && va.on(da, "click", function () {
                        va.addClass(ca, "active"), va.addClass(ia, "hide"), va.addClass(fa, "hide"), va.setAttr(da, "aria-expanded", "true"), va.setAttr(ca, "aria-hidden", "false"), va.ifNil(ha) && va.addClass(ha, "hide")
                    }, !1);
                    var ka = va.byClass("ts-close")[0]
                        , la = function () {
                            (va.hasClass(ca, "active") || va.hasClass(ia, "hide")) && (va.removeClass(ca, "active"), va.removeClass(ia, "hide"), va.removeClass(fa, "hide"), va.setAttr(da, "aria-expanded", "false"), va.setAttr(ca, "aria-hidden", "true"), va.ifNil(ha) && va.removeClass(ha, "hide"))
                        };
                    va.ifNil(ka) && va.on(ka, "click", la, !1);
                    var ma = va.query(".multi-view #header");
                    va.ifNil(ma) && va.on(g, "scroll", function oa() {
                        va.scrollTop() > va.elementHeight(ma) ? va.addClass(I, "active") : (va.removeClass(I, "active"), la()), va.off(g, "scroll", oa, !1)
                    }, !!va.passive && {
                        passive: !0
                    });
                    var na = va.query(".article-view #toolbar");
                    va.ifNil(na) && va.on(g, "scroll", function oa() {
                        va.scrollTop() > va.elementHeight(na) ? va.addClass(I, "active") : (va.removeClass(I, "active"), la()), va.off(g, "scroll", oa, !1)
                    }, !!va.passive && {
                        passive: !0
                    })
                })
            })();
            (function () {
                var ca = va.byClass("header-search")[0]
                    , da = va.query(".header-search form")
                    , fa = va.byId("hs-input")
                    , ha = va.byClass("hs-clear")[0];
                va.ifNil(fa) && (va.on(fa, "keyup", function () {
                    0 === fa.value.length ? (va.removeClass(ha, "active"), va.setAttr(ha, "aria-hidden", "true")) : (va.addClass(ha, "active"), va.setAttr(ha, "aria-hidden", "false"))
                }, !1), va.on(da, "focus", function () {
                    va.addClass(ca, "focus")
                }, !0), va.on(da, "blur", function () {
                    va.removeClass(ca, "focus")
                }, !0));
                va.ifNil(ha) && va.on(ha, "click", function () {
                    va.removeClass(ha, "active"), fa.value = "", fa.focus(), va.setAttr(ha, "aria-hidden", "true")
                }, !1)
            })();
            (function () {
                var ca = va.byClass("toolbar-searchbar")[0]
                    , da = va.query(".toolbar-searchbar form")
                    , fa = va.byId("sb-input")
                    , ha = va.byClass("sb-clear")[0];
                va.ifNil(fa) && (va.on(fa, "keyup", function () {
                    0 === fa.value.length ? (va.removeClass(ha, "active"), va.setAttr(ha, "aria-hidden", "true")) : (va.addClass(ha, "active"), va.setAttr(ha, "aria-hidden", "false"))
                }, !1), va.on(da, "focus", function () {
                    va.addClass(ca, "focus")
                }, !0), va.on(da, "blur", function () {
                    va.removeClass(ca, "focus")
                }, !0));
                va.ifNil(ha) && va.on(ha, "click", function () {
                    va.removeClass(ha, "active"), fa.value = "", fa.focus(), va.setAttr(ha, "aria-hidden", "true")
                }, !1)
            })();
            (function () {
                var ca = function (ha) {
                        ha.matches && va.each(va.queryAll(".footer-item-title"), function (ia) {
                            va.on(ia, "click", function (ja) {
                                ja.stopPropagation();
                                var ka = ja.target || ia || this
                                    , la = va.query(ka.parentNode, ".footer-item");
                                va.ifNull(la) && (va.toggleClass(la, "active"), va.toggleClass(ka, "open"), va.on(g, "click", function () {
                                    va.hasClass(la, "active") && (va.removeClass(la, "active"), va.removeClass(ka, "open"))
                                }, !1))
                            }, !1)
                        })
                    }
                    , da = va.matchMedia("(max-width: 600px)");
                ca(da), da.addListener(ca)
            })();
            (function () {
                new function () {
                    var ia = function () {
                            va.each(va.queryAll("[data-tab]"), function (la) {
                                va.removeClass(la, "active");
                                var ma = va.getAttr(la, "data-tab")
                                    , na = va.byId(ma);
                                va.removeClass(na, "active")
                            })
                        }
                        , ja = function (la) {
                            ia(), va.addClass(la.target || this, "active");
                            var ma = va.getAttr(la.currentTarget || this, "data-tab")
                                , na = va.byId(ma);
                            va.addClass(na, "active")
                        };
                    (function () {
                        va.each(va.queryAll("[data-tab]"), function (la) {
                            va.on(la, "click", ja, !1)
                        })
                    })()
                }
            })();
            (function () {
                if ("querySelector" in j && "addEventListener" in g) {
                    var ca = function (ha, ia, ja) {
                            var ka = function (oa, pa, qa, sa) {
                                    return 1 > (oa /= sa / 2) ? qa / 2 * oa * oa + pa : (oa -= 1, -qa / 2 * (oa * (oa - 2) - 1) + pa)
                                }
                                , la = va.scrollTop() || 0
                                , na = function (oa) {
                                    var pa = ka(oa += 20, la, ia - la, ja);
                                    k.scrollTop = pa, w.scrollTop = pa, oa < ja && va.timeout(function () {
                                        na(oa)
                                    }, 20)
                                };
                            na(0)
                        }
                        , da = function (ha) {
                            var ia, ja = va.query(va.getAttr(ha, "data-scroll"))
                                .offsetTop;
                            ja -= va.hasAttr(ha, "data-scroll-offset") ? va.getAttr(ha, "data-scroll-offset") : 84, ia = va.hasAttr(ha, "data-scroll-speed") ? va.getAttr(ha, "data-scroll-speed") : 300, ca(w, ja, ia)
                        };
                    g.scrolling = {
                        offset: 84
                        , to: da
                    }, va.each(va.queryAll("[data-scroll]"), function (fa) {
                        va.on(fa, "click", function (ha) {
                            g.scrolling.to(ha.currentTarget || fa || this)
                        }, !1)
                    })
                }
            })();
            var aa = va.once(function () {
                va.raf(function () {
                    va.addClass(w, "js-loading"), console.log("Loading...")
                }), va.loaded(function () {
                    va.addClass(w, "js-loaded"), va.removeClass(w, "js-loading"), console.log("Loaded!")
                })
            });
            aa()
        });
        var E = function () {
            var I = va.byId("notification-code")
                , J = va.byId("notification-content");
            va.ifNil(I) && va.html(J, va.text(I))
        };
        E(), G.rippleEffect = function () {
            va.loaded(function () {
                va.each(va.queryAll(".js-ripple"), function (H) {
                    va.on(H, "mousedown", function I(J) {
                        var K = J.currentTarget || H || this
                            , L = j.createElement("div");
                        L.className = "ripple";
                        var P, M = va.offset(K)
                            , N = J.clientX - M.left
                            , O = J.clientY - M.top;
                        P = M.width === M.height ? 1.412 * M.width : Math.sqrt(M.width * M.width + M.height * M.height);
                        var Q = 2 * P + "px";
                        va.setStyle(L, {
                            width: Q
                        }), va.setStyle(L, {
                            height: Q
                        }), va.setStyle(L, {
                            left: -P + N + "px"
                        }), va.setStyle(L, {
                            top: -P + O + "px"
                        });
                        var R = va.getAttr(K, "data-ripple-color");
                        R && va.setStyle(L, {
                            background: R
                        });
                        var S = va.getAttr(K, "data-ripple-opacity");
                        S && va.setStyle(L, {
                            opacity: S
                        });
                        var T = va.getAttr(K, "data-ripple-radius");
                        T && va.setStyle(L, {
                            borderRadius: T
                        }), va.append(K, L);
                        var U = va.throttle(function () {
                            va.addClass(L, "animate")
                        }, 15);
                        U();
                        var V = va.throttle(function () {
                            va.remove(L)
                        }, 650);
                        V(), va.off(H, "mousedown", I, !1)
                    }, !!va.passive && {
                        passive: !0
                    })
                })
            })
        }, G.tooltip = function () {
            va.ready(function () {
                var H = !1
                    , I = !1
                    , J = !1;
                I = j.createElement("div"), I.id = "tooltip", va.setAttr(I, "role", "tooltip"), va.each(va.queryAll(".js-tooltip"), function (K) {
                    var L = function (N) {
                        H = N.target || K || this;
                        var O = va.offset(H);
                        if (J = va.getAttr(H, "title"), !J || "" == J) return !1;
                        va.removeAttr(H, "title"), va.html(I, J), va.append(app, I);
                        (function () {
                            var S = O.left + va.offset(H)
                                .width / 2 - va.offset(I)
                                .width / 2
                                , T = O.top - va.offset(I)
                                .height - 14
                                , U = Math.max(k.clientWidth, g.innerWidth || 0);
                            0 > S ? (S = O.left + va.offset(H)
                                    .width / 2 - 14, va.addClass(I, "left")) : va.removeClass(I, "left"), S + va.offset(I)
                                .width > U ? (S = O.left - va.offset(I)
                                    .width + va.offset(H)
                                    .width / 2 + 14, va.addClass(I, "right")) : va.removeClass(I, "right"), 0 > T ? (T = O.top + va.offset(H)
                                    .height + 14, va.addClass(I, "top")) : va.removeClass(I, "top"), va.setStyle(I, {
                                    left: S + "px"
                                }), va.setStyle(I, {
                                    top: T + "px"
                                }), va.addClass(I, "active")
                        })();
                        var Q = function () {
                            va.setAttr(H, "title", J), va.removeClass(I, "active"), va.remove(I)
                        };
                        va.touch() ? va.on(H, "touchend", Q.bind(this), !!va.passive && {
                            passive: !0
                        }) : (va.on(H, "mouseleave", Q.bind(this), !!va.passive && {
                            passive: !0
                        }), va.on(H, "click", Q.bind(this), !1), va.on(g, "click", Q.bind(this), !1)), va.on(g, "scroll", Q.bind(this), !!va.passive && {
                            passive: !0
                        })
                    };
                    va.touch() ? va.on(K, "touchstart", L.bind(this), !!va.passive && {
                        passive: !0
                    }) : va.on(K, "mouseenter", L.bind(this), !!va.passive && {
                        passive: !0
                    })
                })
            })
        }, G.ads = function () {
            var H = va.byId("adba-code");
            va.ifNil(H) && va.each(va.queryAll(".adba"), function (J) {
                va.html(J, va.text(H))
            });
            var I = va.byId("adf-code");
            va.ifNil(I) && va.each(va.queryAll(".afc"), function (J) {
                va.html(J, va.text(I))
            })
        }, G.loadImages = function (H) {
            var J = va.extend(A || {
                    lazyClass: "js-lazy"
                    , throttle: 200
                    , threshold: 200
                }, H || {})
                , K = "img." + J.lazyClass;
            va.ready(function () {
                var L = [].slice.call(va.queryAll(K))
                    , M = function (R) {
                        var S = va.getAttr(R, "data-src")
                            , T = va.getAttr(R, "data-srcset");
                        if (va.hasAttr(R, "data-src") || va.hasAttr(R, "data-srcset")) {
                            var U = R.width
                                , V = R.height
                                , W = new Image;
                            V = 0 == V ? "" : "-h" + V + "-p", S = S.replace("/s1600/", "/w" + U + V + "/"), S = S.replace("/w1600/", "/w" + U + V + "/"), S = S.replace("/s680/", "/w" + U + V + "/"), S = S.replace("/w680/", "/w" + U + V + "/"), S = S.replace("/s500/", "/w" + U + V + "/"), S = S.replace("/w500/", "/w" + U + V + "/"), S = S.replace("/s400/", "/w" + U + V + "/"), S = S.replace("/w400/", "/w" + U + V + "/"), S = S.replace("/s300/", "/w" + U + V + "/"), S = S.replace("/w300/", "/w" + U + V + "/"), va.hasAttr(R, "data-src") && (W.src = S, R.src = W.src, va.removeAttr(R, "data-src")), va.hasAttr(R, "data-srcset") && (W.srcset = T, R.srcset = W.srcset, va.removeAttr(R, "data-srcset")), va.removeClass(R, J.lazyClass), L = L.filter(function (X) {
                                return X !== R
                            })
                        }
                    }
                    , N = {
                        intersectionObserverSupport: "IntersectionObserver" in g && "IntersectionObserverEntry" in g && "intersectionRatio" in g.IntersectionObserverEntry.prototype
                    };
                if (!0 === N.intersectionObserverSupport) {
                    var P = new IntersectionObserver(function (Q) {
                        va.each(Q, function (S) {
                            if (!0 === S.isIntersecting || 0 < S.intersectionRatio) {
                                var T = S.target;
                                M(T), P.unobserve(T)
                            }
                        })
                    }, {
                        rootMargin: J.threshold + "px 0%"
                    });
                    va.each(L, function (Q) {
                        P.observe(Q)
                    })
                } else(function () {
                    function R() {
                        !1 === S && (S = !0, va.timeout(function () {
                            va.each(L, function (T) {
                                (va.offset(T)
                                    .top <= g.innerHeight || k.clientHeight + J.threshold && va.offset(T)
                                    .bottom >= -J.threshold && "none" !== va.getStyle(T)
                                    .display) && (M(T), 0 === L.length && (va.off("scroll", R), va.off("touchmove", R), va.off(g, "resize", R), va.off(g, "orientationchange", R)))
                            }), S = !1
                        }, J.throttle))
                    }
                    var S = !1;
                    va.on("scroll", R), va.on("touchmove", R), va.on(g, "resize", R), va.on(g, "orientationchange", R)
                })()
            })
        }, G.popup = function (H) {
            var J = va.extend(A || {
                target: "data-href"
                , style: "height=500, width=500, left=10, top=10, resizable=yes, scrollbars=yes, toolbar=yes, menubar=no, location=no, directories=no, status=yes"
            }, H || {});
            va.each(va.queryAll(".js-popup"), function (K) {
                va.on(K, "click", function (L) {
                    var M = va.getAttr(L.currentTarget || K || this, J.target);
                    g.open(M, "popUpWindow", J.style)
                }, !1)
            })
        }, G.notranslate = function (H) {
            var J = va.extend(A || {
                selector: "pre, code"
            }, H || {});
            va.each(va.queryAll(J.selector), function (K) {
                va.addClass(K, "notranslate")
            })
        }, G.doubleclick = function (H) {
            var J = va.extend(A || {
                selector: "pre, code, kbd, mark, textarea, .link"
            }, H || {});
            va.each(va.queryAll(J.selector), function (K) {
                va.on(K, "dblclick", function (L) {
                    if (L.preventDefault(), j.createRange) {
                        var M = getSelection()
                            , N = j.createRange();
                        N.selectNodeContents(L.target || K || this), M.removeAllRanges(), M.addRange(N)
                    }
                }, !1)
            })
        }, G.ripple = function (H) {
            var J = va.extend(A || {
                selector: ".btn:not(.no-ripple), .toolbar-action, #drawer-list a, #drawer-list button, .dropdown-content ul > li, .dropdown-action, .accordion-toggle"
            }, H || {});
            va.each(va.queryAll(J.selector), function (K) {
                va.addClass(K, "js-ripple")
            })
        }, G.toc = va.once(function (H) {
            var J = va.extend(A || {
                    selector: ".post-body h3"
                    , target: "#toc"
                    , headingLevel: "h2"
                    , heading: "Table of Contents"
                    , listType: "ul"
                    , style: null
                    , scrollAnim: !1
                    , scrollSpeed: 300
                    , scrollOffset: -84
                }, H || {})
                , K = va.query(J.target);
            if (K) {
                var L = va.queryAll(J.selector)
                    , M = ""
                    , N = L.length;
                for (z = 0; z < N; z++)
                    if (L[z].id) {
                        var O = J.scrollAnim ? " data-scroll=\"#" + L[z].id + "\" data-scroll-speed=\"" + J.scrollSpeed + "\" data-scroll-offset=\"" + J.scrollOffset + "\" " : "";
                        M += "<li><a " + O + " href=\"#" + L[z].id + "\" title=\"" + va.html(L[z]) + "\">" + va.html(L[z]) + "</a></li>"
                    } 1 > M.length || va.html(K, "<" + J.headingLevel + ">" + J.heading + "</" + J.headingLevel + "><" + J.listType + (J.style ? " class=\"" + J.style + "\"" : "") + ">" + M + "</" + J.listType + ">")
            }
        }), G.anchor = va.once(function (H) {
            var J = va.extend(A || {
                    title: "Link to this heading"
                    , heading: ".post-body h2, .post-body h3, .post-body h4"
                    , style: "anchor"
                }, H || {})
                , K = va.queryAll(J.heading)
                , L = K.length;
            for (z = 0; z < L; z++) K[z].id && va.htmlBeforeEnd(K[z], " <a class=\"" + J.style + "\" href=\"#" + K[z].id + "\" title=\"" + J.title + "\"></a>");
            va.matches(w, ".js-anchors")
        }), G.analytics = function (H) {
            var J = va.extend(A || {
                command: "blogger.send"
            }, H || {});
            va.each(va.queryAll(".js-ga-event"), function (K) {
                va.on(K, "click", function (L) {
                    var M = L.currentTarget || K || this;
                    if ("undefined" != typeof ga) {
                        var N = va.getAttr(M, "data-ga-category") || "Null"
                            , O = va.getAttr(M, "data-ga-action") || "Null"
                            , P = va.getAttr(M, "data-ga-label") || "Null";
                        ga(J.command, {
                            hitType: "event"
                            , eventCategory: N
                            , eventAction: O
                            , eventLabel: P
                            , transport: "beacon"
                        })
                    }
                }, !1)
            })
        }, G.clipboard = va.once(function (H) {
            var J = va.extend(A || {
                linkCopied: "Link copied to clipboard!"
                , copied: "Copied to clipboard!"
                , copy: "Copy"
                , command: "blogger.send"
            }, H || {});
            va.loaded(function () {
                "undefined" != typeof ClipboardJS && ClipboardJS && va.each(va.queryAll(".snackbar-text"), function (K) {
                    va.each(va.queryAll(".js-copy"), function (L) {
                        var M = new ClipboardJS(L, {
                            text: function () {
                                return va.getAttr(L, "data-copy-url")
                            }
                        });
                        M.on("success", function () {
                            var N = va.byClass("snackbar")[0];
                            va.addClass(N, "active"), va.text(K, J.linkCopied);
                            var O = va.throttle(function () {
                                va.removeClass(N, "active")
                            }, 3e3);
                            if (O(), "undefined" != typeof ga) {
                                var P = va.getAttr(L, "data-copy-url");
                                ga(J.command, {
                                    hitType: "event"
                                    , eventCategory: "Share"
                                    , eventAction: "Copy post url to clipboard"
                                    , eventLabel: P
                                    , transport: "beacon"
                                })
                            }
                        })
                    }), va.each(va.queryAll("pre"), function (L) {
                        var M = j.createElement("div");
                        M.className = "copy", va.html(M, "<span class=\"mdi mdi-content-copy\" role=\"button\" tabindex=\"-1\" title=\"" + J.copy + "\"></span>"), L.insertBefore(M, L.childNodes[0]);
                        var N = new ClipboardJS(M, {
                            text: function () {
                                return va.text(L)
                            }
                        });
                        N.on("success", function () {
                            var O = va.byClass("snackbar")[0];
                            va.addClass(O, "active"), va.text(K, J.copied);
                            var P = va.throttle(function () {
                                va.removeClass(O, "active")
                            }, 3e3);
                            P(), "undefined" != typeof ga && ga(J.command, {
                                hitType: "event"
                                , eventCategory: "Code"
                                , eventAction: "Copy code to clipboard"
                                , eventLabel: g.location.href
                                , transport: "beacon"
                            })
                        })
                    })
                })
            })
        }), G.snackbar = va.once(function (H) {
            var J = va.extend(A || {
                position: "snackbar-bottom snackbar-left"
            }, H || {});
            va.hasClass(k, "article-view") && va.ready(function () {
                va.htmlBeforeEnd(app, "<div class=\"snackbar " + J.position + "\"><div class=\"snackbar-wrap\"><div class=\"snackbar-content\"><span class=\"snackbar-text\"></span></div></div></div>")
            })
        }), G.accordion = function (H) {
            function I() {
                va.each(va.queryAll(".accordion-content"), function (U) {
                    va.addClass(U, R), U.style.maxHeight && va.setStyle(U, {
                        maxHeight: null
                    })
                })
            }

            function J(T) {
                va.removeClass(T, R), va.setStyle(T, {
                    maxHeight: T.scrollHeight
                }) && va.setStyle(T, {
                    maxHeight: T.scrollHeight + "px"
                })
            }

            function K(T) {
                va.addClass(T, S), L(T)
            }

            function L(T) {
                var U = va.hasClass(T, S) ? "true" : "false";
                va.setAttr(T, "aria-expanded", U)
            }

            function M() {
                va.each(va.queryAll(".accordion-toggle"), function (U) {
                    va.removeClass(U, S), L(U)
                })
            }

            function N(T) {
                var U = va.query(T, ".accordion-toggle");
                T = va.query(T, ".accordion-content"), va.addClass(U, S), L(U), va.removeClass(T, R), va.setStyle(T, {
                    maxHeight: T.scrollHeight
                }) && va.setStyle(T, {
                    maxHeight: T.scrollHeight + "px"
                })
            }
            var P = va.extend(A || {
                    firstActive: !0
                }, H || {})
                , Q = va.queryAll(".accordion")
                , R = "hide"
                , S = "active";
            va.each(Q && Q, function (T) {
                I(T), !0 == P.firstActive && !1 == !P.firstActive && N(T), va.each(va.queryAll(".accordion-toggle"), function (U) {
                    va.on(U, "click", function (V) {
                        V = va.getAttr(U, "aria-controls"), V = va.query(T, "#" + V);
                        var W = !va.hasClass(U, S);
                        I(T), M(T), W && (J(V), K(U))
                    }, !1)
                })
            })
        }, G.toolbar = function (H) {
            var J = va.extend(A || {
                    hide: !0
                    , showBottom: !1
                }, H || {})
                , K = va.byClass("has-toolbar")[0];
            if (K && !0 == J.hide && !1 == !J.hide) {
                var L = 0
                    , M = 0
                    , N = 0
                    , O = 0
                    , P = 0
                    , Q = 0;
                va.on(g, "scroll", function R() {
                    L = va.elementHeight(K), M = va.documentHeight(), N = g.innerHeight || k.clientHeight, O = va.scrollTop(), Q = P - O, 0 >= O ? va.removeClass(K, "hide") : 0 < Q ? va.removeClass(K, "hide") : 0 > Q && (O + N >= M - L ? !0 == J.showBottom && !1 == !J.showBottom && va.removeClass(K, "hide") : va.addClass(K, "hide")), P = O, va.off(g, "scroll", R, !1)
                }, !!va.passive && {
                    passive: !0
                })
            }
        }, G.scrollIndicator = va.once(function (H) {
            !0 == H && !1 == !H && va.loaded(function () {
                va.on(g, "scroll", function I() {
                    var J = va.byClass("indicator-bar")[0]
                        , K = va.documentHeight() - va.elementHeight(k)
                        , L = 100 * (va.scrollTop() / K);
                    va.setStyle(J, {
                        width: L + "%"
                    }), va.off(g, "scroll", I, !1)
                }, !!va.passive && {
                    passive: !0
                })
            })
        }), G.stickyWidget = function (H) {
            if (!0 == H && !1 == !H) {
                var I = va.byId("sidebar-sticky")
                    , J = va.byId("Sticky-Sidebar")
                    , K = va.byId("navigation")
                    , L = function () {
                        if (I) {
                            var P = va.offset(I)
                                , Q = J.clientHeight || J.scrollHeight || J.offsetHeight
                                , R = J.offsetWidth
                                , S = va.offset(K);
                            1 > P.top && 0 < S.top - +Q + R + S.top ? va.addClass(J, "sticky") : va.removeClass(J, "sticky")
                        }
                    }
                    , M = !1
                    , N = 0;
                va.on(g, "scroll", function O() {
                    var P = va.scrollTop();
                    if (!M) {
                        var Q = function () {
                            L(), M = !1, N = P
                        };
                        va.raf(Q)
                    }
                    M = !0, va.off(g, "scroll", O, !1)
                }, !!va.passive && {
                    passive: !0
                })
            }
        }, G.shufflePosts = va.once(function (H) {
            !0 == H && !1 == !H && va.each(va.queryAll(".multi-view .post-outer ~ .post-outer, .multi-view .post-wrap ~ .post-wrap"), function (I) {
                var J = I.parentNode
                    , K = Math.floor(Math.random() * J.children.length - 1);
                va.remove(I), J.insertBefore(I, J.children[K])
            })
        }), G.antiInspect = function (H) {
            !0 == H && !1 == !H && function I() {
                try {
                    (function J(K) {
                        if (1 !== ("" + K / K)
                            .length || 0 == K % 20)(function () {})
                            .constructor("debugger")();
                        else debugger;
                        J(++K)
                    })(0)
                } catch (J) {
                    va.timeout(I, 5e3)
                }
            }()
        }, Object.defineProperty(g, "eraMaterial", {
            value: function (H, I) {
                return new G(H, I)
            }
        });
        var F = g.eraMaterial;
        F.rippleEffect = G.rippleEffect, F.tooltip = G.tooltip, F.ads = G.ads, F.loadImages = G.loadImages, F.popup = G.popup, F.notranslate = G.notranslate, F.doubleclick = G.doubleclick, F.ripple = G.ripple, F.toc = G.toc, F.anchor = G.anchor, F.analytics = G.analytics, F.clipboard = G.clipboard, F.snackbar = G.snackbar, F.accordion = G.accordion, F.toolbar = G.toolbar, F.scrollIndicator = G.scrollIndicator, F.stickyWidget = G.stickyWidget, F.shufflePosts = G.shufflePosts, F.antiInspect = G.antiInspect, Object.freeze(g.eraMaterial), G.rippleEffect(), G.tooltip(), G.ads()
    } else throw new Error("Initializing " + B + " template failed.")
})(window, document);
