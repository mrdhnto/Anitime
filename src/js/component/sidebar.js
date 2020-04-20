class SideBar extends HTMLElement {
	constructor(){
		super();
	}

	connectedCallback(){
 		this.render();
	}
 
	render() {
		this.innerHTML = `
		<style>
		#sidebar {
		    width: 180px;
		    position: fixed;
		    top: 48px;
		    left: -185px;
		    height: 100vh;
		    z-index: 999;
		    background-color: #131417;
		    color: #9e9e9e;
		    transition: all 0.3s;
		    overflow-y: scroll;
		    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
		}

		#sidebar.active {
		    left: 0;
		}

		#dismiss {
		    width: 35px;
		    height: 35px;
		    line-height: 35px;
		    text-align: center;
		    color: #9e9e9e;
		    background-color: #131417;
		    position: absolute;
		    top: 1.2em;
		    right: 0.5em;
		    cursor: pointer;
		    -webkit-transition: all 0.3s;
		    -o-transition: all 0.3s;
		    transition: all 0.3s;
		}

		#dismiss:hover {
		    background-color: #00ffdc;
		    color: #ffffff;
		}

		.overlay {
		    display: none;
		    position: fixed;
		    width: 100vw;
		    height: 100vh;
		    background-color: rgba(0, 0, 0, 0.7);
		    z-index: 998;
		    opacity: 0;
		    transition: all 0.5s ease-in-out;
		}
		.overlay.active {
		    display: block;
		    opacity: 1;
		    top: 48px;
		}

		#sidebar .sidebar-header {
		    padding: 1.2em 1em 1em 1em;
		    color: #00ffdc;
		    background-color: #131417;
		}

		.sidebar-header img {
		    height: 41px;
		}

		#sidebar ul.components {
		    padding: 0px 0 20px 0;
		    border-bottom: 1px solid #006f74;
		}

		#sidebar ul li a {
		    display: block;
		    background-color: #131417;
		}

		#sidebar ul li a:hover {
		    text-decoration: bold;
		    color: #131417;
		    background-color: #00ffdc;
		}

		.nav-link i{
		    text-align: center;
		    width: 24px;
		}

		#sidebar .nav-item.active {
		    color: #00ffdc;
		    transition: all 0.3s;
		    }

		#sidebar .nav-item.active:hover {
		    color: #00ffdc;
		    background-color: #131417;
		    cursor: default;
		}

		#sidebar .nav-item:hover, #sidebar .nav-item2:hover {
		    color: #131417;
		    background-color: #00ffdc;
		    cursor: pointer;
		    transition: all 0.3s;
		}

		</style>
		<nav id="sidebar">
            <div class="sidebar-header">
                <img src="/dist/assets/images/logo.png">
                <div id="dismiss">
                <span class="material-icons align-middle">arrow_back</span>
                </div>
            </div>
            <ul class="list-unstyled components ">
                <li class="nav-item active" target="TV">
                    <div class="nav-link">
                        <span class="material-icons align-middle">tv</span>
                        <span class="ml-1">&nbspTV</span>
                    </div>
                </li>
                <li class="nav-item" target="OVA">
                    <div class="nav-link">
                        <span class="material-icons align-middle">album</span>
                        <span class="ml-1">&nbspOVA&nbsp&nbsp/ ONA</span>
                    </div>
                </li>
                <li class="nav-item" target="MOVIE">
                    <div class="nav-link">
                        <span class="material-icons align-middle">movie</span>
                        <span class="ml-1">&nbspMovie</span>
                    </div>
                </li>
            </ul>
            <ul class="list-unstyled">
              <li class="nav-item2"><a target="_blank" href="https://darkerside.github.io">
                <div class="nav-link">
                  <span class="material-icons align-middle">info</span>
                  <span class="ml-1">&nbspAbout</span>
                </div></a>
              </li>
              <li class="nav-item2"><a target="_blank" href="https://trakteer.id/ra121514">
                <div class="nav-link">
                  <span class="material-icons align-middle">credit_card</span>
                  <span class="ml-1">&nbspSupport Me</span>
                </div></a>
              </li>
              <li class="nav-item2"><a target="_blank" href="https://github.com/Darkerside/Anitime">
                <div class="nav-link">
                  <span class="material-icons align-middle">language</span>
                  <span class="ml-1">&nbspGithub</span>
                </div></a>
              </li>
            </ul>
        </nav>
		`;
	}
}
customElements.define("side-bar", SideBar);
