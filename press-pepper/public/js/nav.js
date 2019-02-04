// Implemetion reference: https://juejin.im/post/5aeef41cf265da0ba0630de0
// Background image from free image website: https://spixabay.com/

const helper = {
    getDelta(event) {
        if(event.wheelDelta) {
            return event.wheelDelta;
        } else {
            return -event.detail;
        }
    },
    throttle(method, delay, context) {
        let inThrottle = false;
        return function() {
            if (!inThrottle) {
                inThrottle = true;
                method.apply(context, arguments);
                setTimeout(() => {
                    inThrottle = false;
                }, delay);
            }
        }
    },
    debounce(method, delay, context) {
        let inDebounce;
        return function() {
            clearTimeout(method.inDebounce);
            inDebounce = setTimeout(() => {
                method.apply(context, arguments);
            }, delay);
        }
    }
}


class SwitchQuestion{
	
	
	
	
}
class ScrollPages {
    constructor(currentPageNumber, totalPageNumber, pages){
        this.currentPageNumber = currentPageNumber;
        this.totalPageNumber = totalPageNumber;
        this.pages = pages;
        this.viewHeight = document.documentElement.clientHeight;
    }

    scrollDown() {
        if (this.currentPageNumber !== this.totalPageNumber){
            this.pages.style.top = (-this.viewHeight * this.currentPageNumber) + 'px';
            this.currentPageNumber++;
            this.updateNav();
            this.textFadeInOut();
        }
    }
    scrollUp() {
        if (this.currentPageNumber !== 1) {
            this.pages.style.top = (-this.viewHeight * (this.currentPageNumber - 2)) + 'px';
            this.currentPageNumber--;
            this.updateNav();
            this.textFadeInOut();
        }
    }
    scrollTo(targetPageNumber) {
        while (this.currentPageNumber !== targetPageNumber) {
            if (this.currentPageNumber > targetPageNumber) {
                this.scrollUp();
            } else {
                this.scrollDown();
            }
        }
    }
    createNav() {
        const pageNav = document.createElement('div');
        pageNav.className = 'nav-dot-container';
        this.pages.appendChild(pageNav);
        for(let i=0; i < this.totalPageNumber; i++) {
            pageNav.innerHTML += '<p class="nav-dot"><span></span></p>';
        }
        const navDots = document.getElementsByClassName('nav-dot');
        this.navDots = Array.prototype.slice.call(navDots);
        this.navDots[0].classList.add('dot-active');
        this.navDots.forEach((e, index) => {
            e.addEventListener('click', event => {
                this.scrollTo(index+1);
                this.navDots.forEach(e => {
                    e.classList.remove('dot-active');
                });
                e.classList.add('dot-active');
            });
        });
    }
    updateNav() {
        this.navDots.forEach(e => {
            e.classList.remove('dot-active');
        });
        this.navDots[this.currentPageNumber-1].classList.add('dot-active');
    }
    resize() {
        this.viewHeight = document.documentElement.clientHeight;
        this.pages.style.height = this.viewHeight + 'px';
        this.pages.style.top = -this.viewHeight * (this.currentPageNumber-1) + 'px';
    }
    textFadeInOut() {
        const containersDom = document.getElementsByClassName('text-container');
        let textContainers = Array.prototype.slice.call(containersDom);
        textContainers.forEach((e) => {
            e.classList.remove('in-sight');
        });
        let textContainerInSight = textContainers[this.currentPageNumber-1];
        textContainerInSight.classList.add('in-sight')
    }
    init() {
        let handleResize = helper.debounce(this.resize, 500, this);
        this.pages.style.height = this.viewHeight + 'px';
        this.createNav();
        this.textFadeInOut();
        document.addEventListener('touchstart', (event) => {
            this.startY = event.touches[0].pageY;
        });
        document.addEventListener('touchend', (event) => {
            let endY = event.changedTouches[0].pageY;
            if (this.startY - endY < 0) {
                this.scrollUp();
            }
            if (this.startY - endY > 0) {
                this.scrollDown();
            }
        });
        document.addEventListener('touchmove', (event) => {
            event.preventDefault();
        });
        window.addEventListener('resize', handleResize);
    }
}

document.addEventListener('DOMContentLoaded', function() {
	
	var score=0;
    var s = new ScrollPages(1,10,document.getElementById('all-pages'));
    s.init();
	
	disc=document.getElementById("disc");
	disc.onclick=function(){s.scrollDown();};
	disc1=document.getElementById("disc1");
	disc1.onclick=function(){s.scrollDown();};
	
	disc2=document.getElementById("disc2");
	disc2.onclick=function(){s.scrollDown();};
	
	disc3=document.getElementById("disc3");
	disc3.onclick=function(){s.scrollDown();};
	
	disc4=document.getElementById("disc4");
	disc4.onclick=function(){s.scrollDown();};
	
	//Quizz 1 elem 1 -2 -3
	i=document.getElementById("click");
	r=document.getElementById("clickT");
	i.onclick=function() {i.style.borderRadius="50%";i.style.border = "thick solid red";setTimeout(function() {s.scrollTo(4);}, 700);};
	i.onmouseover=function(){r.style.opacity="0.8";i.style.width="19%";};
	i.onmouseout=function(){r.style.opacity="0.0";i.style.width="18%";};
	
	i1=document.getElementById("click2");
	r2=document.getElementById("clickT2");
	i1.onclick=function(){score++;i1.style.borderRadius="50%";i1.style.border = "thick solid green";	setTimeout(function() {s.scrollTo(4);}, 700);};
	i1.onmouseover=function(){r2.style.opacity="0.8";i1.style.width="19%";};
	i1.onmouseout=function(){r2.style.opacity="0.0";i1.style.width="18%";};
	
	r3=document.getElementById("clickT3");	
	i2=document.getElementById("click3");
	i2.onclick=function() {i2.style.borderRadius="50%";i2.style.border = "thick solid red";	setTimeout(function() {s.scrollTo(4);}, 700);};
	i2.onmouseover=function(){r3.style.opacity="0.8";i2.style.width="19%";};
	i2.onmouseout=function(){r3.style.opacity="0.0";i2.style.width="18%";};
	
	//quizz2 elem 1-2-3

	ii=document.getElementById("clickk");
	rr=document.getElementById("clickkT");
	ii.onclick=function() {ii.style.borderRadius="50%";ii.style.border = "thick solid red";setTimeout(function() {s.scrollTo(6	);}, 700);};
	ii.onmouseover=function(){rr.style.opacity="0.8";ii.style.width="19%";};
	ii.onmouseout=function(){rr.style.opacity="0.0";ii.style.width="18%";};
	
	ii1=document.getElementById("clickk2");
	rr2=document.getElementById("clickkT2");
	ii1.onclick=function(){ii1.style.borderRadius="50%";ii1.style.border = "thick solid red";	setTimeout(function() {s.scrollTo(6);}, 700);};
	ii1.onmouseover=function(){rr2.style.opacity="0.8";ii1.style.width="19%";};
	ii1.onmouseout=function(){rr2.style.opacity="0.0";ii1.style.width="18%";};
	
	rr3=document.getElementById("clickkT3");	
	ii2=document.getElementById("clickk3");
	ii2.onclick=function() {score++;ii2.style.borderRadius="50%";ii2.style.border = "thick solid green";	setTimeout(function() {s.scrollTo(6);}, 700);};
	ii2.onmouseover=function(){rr3.style.opacity="0.8";ii2.style.width="19%";};
	ii2.onmouseout=function(){rr3.style.opacity="0.0";ii2.style.width="18%";};
	
	//quizz3 elem 1-2-3

	iii=document.getElementById("clickkk");
	rrr=document.getElementById("clickkkT");
	iii.onclick=function() {score++;iii.style.borderRadius="50%";iii.style.border = "thick solid green";setTimeout(function() {s.scrollDown();}, 700);};
	iii.onmouseover=function(){rrr.style.opacity="0.8";iii.style.width="19%";};
	iii.onmouseout=function(){rrr.style.opacity="0.0";iii.style.width="18%";};
	
	iii1=document.getElementById("clickkk2");
	rrr2=document.getElementById("clickkkT2");
	iii1.onclick=function(){iii1.style.borderRadius="50%";iii1.style.border = "thick solid red";	setTimeout(function() {s.scrollDown();}, 700);};
	iii1.onmouseover=function(){rrr2.style.opacity="0.8";iii1.style.width="19%";};
	iii1.onmouseout=function(){rrr2.style.opacity="0.0";iii1.style.width="18%";};
	
	rrr3=document.getElementById("clickkkT3");	
	iii2=document.getElementById("clickkk3");
	iii2.onclick=function() {iii2.style.borderRadius="50%";iii2.style.border = "thick solid red";	setTimeout(function() {s.scrollDown();}, 700);};
	iii2.onmouseover=function(){rrr3.style.opacity="0.8";iii2.style.width="19%";};
	iii2.onmouseout=function(){rrr3.style.opacity="0.0";iii2.style.width="18%";};
	
/*	var delayInMilliseconds = 3000; 
	setTimeout(function() {
		s.scrollTo(2);
	}, delayInMilliseconds);*/
})