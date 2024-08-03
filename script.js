const a = './assets/';
document.createElement('h3');
document.addEventListener("DOMContentLoaded", () => {
	const configuration = {
		identifierAndVersion: "1.0.0",
		defaultPage: "onViewPage", // <-- Add this line
		uiSetup: {
			header: {
				logoUrl: 'url-to-logo',
				navigationPages: {

					onViewPage: {
						pageTitle: 'ON VIEW',
						pageContent: [{
							id: 1,
							dataTitle: 'Summer collection',
							description: '₾ 39 \n description',
							imageSource: `${a}1.png`
						}, {
							id: 2,
							dataTitle: 'Limited collection',
							description: '₾ 39 \n description',
							imageSource: `${a}2.png`
						}, {
							id: 3,
							dataTitle: 'Limited collection',
							description: '₾ 39 \n description',
							imageSource: `${a}3.png`
						}, {
							id: 4,
							dataTitle: 'data title',
							description: '₾ 39 \n description',
							imageSource: `${a}4.png`
						}]
					},
					aboutUs: {
						pageTitle: 'Art & Artist',
						pageContent: [{
							id: 1,
							dataTitle: 'data title',
							description: '₾ 39 \n description',
							imageSource: `${a}4.png`
						}
						]
					},


				}
			},
			utilityFunctions: {
				createNavBar: function (pages) {
					const navItems = document.querySelector("#navigationBar .nav-items");
					Object.keys(pages).forEach(page => {
						const link = document.createElement("a");
						link.href = "#";
						link.innerText = page.replace('Page', '').replace(/([A-Z])/g, ' $1').trim();
						link.onclick = () => loadPage(page);
						navItems.appendChild(link);
					});

					const languageToggle = document.querySelector("#navigationBar .language-toggle");
					["EN", "FR", "GE"].forEach(lang => {
						const span = document.createElement("span");
						span.innerText = lang;
						languageToggle.appendChild(span);
					});
				},
				loadPage: function (pageTitle, pageName) {
					const content = document.getElementById("pageTitle");
					content.innerHTML = '';
					this.pageBuild(pageName);
				},
				displayShopCollections: function (collections) {
					const content = document.getElementById("pageContent");
					content.innerHTML = '';
					collections.forEach(item => {
						const itemDiv = this.createProductItem(item.dataTitle, item.description, item.imageSource);
						content.appendChild(itemDiv);
					});
				},
				createProductItem: function (dataTitle, description, imageSource) {
					const itemDiv = document.createElement("div");
					itemDiv.className = 'item';
					const itemName = document.createElement("h3");
					itemName.innerText = dataTitle;
					const itemDescription = document.createElement("p");
					itemDescription.innerText = description;
					const card = document.createElement("div");
					const itemImage = document.createElement("img");
					itemImage.src = imageSource;
					card.appendChild(itemImage);
					card.className = 'card';
					itemDiv.appendChild(itemName);
					itemDiv.appendChild(itemDescription);
					itemDiv.appendChild(card);

					return itemDiv;
				},
				pageBuild: function (pageName) {
					const page = configuration.uiSetup.header.navigationPages[pageName];
					const title = document.getElementById("pageTitle");
					title.innerHTML = `<h1>${page.pageTitle}</h1>`;
					this.displayShopCollections(page.pageContent);
				},
			}
		}
	};

	function loadPage(pageName) {
		const page = configuration.uiSetup.header.navigationPages[pageName];
		configuration.uiSetup.utilityFunctions.loadPage(page.pageTitle, pageName);
	}

	function initializePage(config) {
		config.uiSetup.utilityFunctions.createNavBar(config.uiSetup.header.navigationPages);

		// load images from assets folder and add it to config.pages


		loadPage(config.defaultPage); // <-- Use defaultPage here
	}

	initializePage(configuration);
});


