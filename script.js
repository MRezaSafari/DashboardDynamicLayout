let rowEditMode = false;
let rowEditRef = null;
let selectedColRef = null;

const _axios = axios.create({
	baseURL: "http://localhost:9000/",
});


//drag and drop functionality
function initiateDragula() {
	let rows = document.querySelectorAll(".grid__container .row");

	rows.forEach((row) => {
		let rc = row.querySelector(".reports__container");
		dragula([rc]);
	});
}

function bindEvents() {
	document.querySelectorAll(".move_up").forEach(function (button) {
		button.addEventListener(
			"click",
			function (e) {
				e.preventDefault();
				e.stopImmediatePropagation();

				let parent = this.parentNode.parentNode;
				let prevRow = parent.previousElementSibling;

				if (prevRow === null) return null;

				prevRow.before(parent);
			},
			false
		);
	});

	document.querySelectorAll(".move_down").forEach(function (button) {
		button.addEventListener(
			"click",
			function (e) {
				e.preventDefault();
				e.stopImmediatePropagation();

				let parent = this.parentNode.parentNode;
				let nextRow = parent.nextElementSibling;

				if (nextRow === null) return null;

				nextRow.after(parent);
			},
			false
		);
	});

	document.querySelectorAll(".row_remove").forEach(function (button) {
		button.addEventListener("click", function (e) {
			e.preventDefault();
			e.stopImmediatePropagation();

			let parent = this.parentNode.parentNode;

			if (confirm("Are you sure you want to remove this row?"))
				parent.remove();
		});
	});

	document.querySelectorAll(".col-settings").forEach(function (button) {
		button.addEventListener("click", function (e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			let parent = this.parentNode.parentNode;

			selectedColRef = parent;

			toggleReportSelector(true);
		});
	});

	document.querySelectorAll(".row_settings").forEach(function (button) {
		button.addEventListener("click", function (e) {
			e.preventDefault();
			e.stopImmediatePropagation();

			let parent = this.parentNode.parentNode;
			let cols = parent.querySelectorAll("div[class^='col-']");

			let finalValue = 0;

			if (
				cols[0].className.indexOf("-2") > -1 &&
				cols[1].className.indexOf("-10") > -1
			) {
				finalValue = 0;
			}

			if (
				cols[0].className.indexOf("-3") > -1 &&
				cols[1].className.indexOf("-9") > -1
			) {
				finalValue = 1;
			}

			if (
				cols[0].className.indexOf("-4") > -1 &&
				cols[1].className.indexOf("-8") > -1
			) {
				finalValue = 2;
			}

			if (
				cols[0].className.indexOf("-5") > -1 &&
				cols[1].className.indexOf("-7") > -1
			) {
				finalValue = 3;
			}

			if (
				cols[0].className.indexOf("-6") > -1 &&
				cols[1].className.indexOf("-6") > -1
			) {
				finalValue = 4;
			}

			if (
				cols[0].className.indexOf("-7") > -1 &&
				cols[1].className.indexOf("-5") > -1
			) {
				finalValue = 5;
			}

			if (
				cols[0].className.indexOf("-8") > -1 &&
				cols[1].className.indexOf("-4") > -1
			) {
				finalValue = 6;
			}

			if (
				cols[0].className.indexOf("-9") > -1 &&
				cols[1].className.indexOf("-3") > -1
			) {
				finalValue = 7;
			}

			if (
				cols[0].className.indexOf("-10") > -1 &&
				cols[1].className.indexOf("-2") > -1
			) {
				finalValue = 8;
			}

			document.querySelector(".grid-value-selector").selectedIndex = finalValue;
			document.querySelector("#CreateRow").innerText = "Change Columns";
			rowEditMode = true;
			rowEditRef = parent;
			toggleRowCreator(true);
		});
	});

	document.querySelector(".add-row a").addEventListener("click", function (e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		toggleRowCreator(true);
	});
}

function toggleRowCreator(state) {
	let rowCreator = document.querySelector(".row-creator__container");

	if (state) {
		rowCreator.classList.add("open");
	} else {
		rowCreator.classList.remove("open");
		setTimeout(() => {
			document.querySelector("#CreateRow").innerText = "Insert";
			document.querySelector(".grid-value-selector").selectedIndex = 0;
		}, 800);
	}
}

function toggleReportSelector(state) {
	let reportSelector = document.querySelector(".report-selector__container");

	if (state) {
		reportSelector.classList.add("open");
	} else {
		reportSelector.classList.remove("open");
	}
}

function injectRowCreatorButton() {
	let buttonContainer = document.createElement("div");
	buttonContainer.className = "add-row";
	buttonContainer.innerHTML = `<a href="#" class="btn btn-danger">
									<span class="icon-plus-circle"></span>
									Add New Row</a
								>`;

	document.querySelector(".grid__container").after(buttonContainer);
}

function injectRowCreator() {
	if (document.querySelector(".row-creator__container") !== null) return;

	let rowCreatorContainer = document.createElement("div");
	rowCreatorContainer.className = "row-creator__container";

	let creator = document.createElement("div");
	creator.className = "row-creator-holder";

	let closeButton = document.createElement("a");
	closeButton.href = "#";
	closeButton.className = "close-button";
	closeButton.innerHTML = `<span class="icon-x-circle"></span>`;

	closeButton.addEventListener("click", function (e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		toggleRowCreator(false);
	});

	let header = document.createElement("div");
	header.className = "header";

	let title = document.createElement("p");
	title.className = "title";
	title.innerText = "Add new row";

	header.appendChild(closeButton);
	header.appendChild(title);

	let helpText = document.createElement("p");
	helpText.className = "help-text";
	helpText.innerText =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, inventore reiciendis? Distinctio illum cum exercitationem quo nihil perspiciatis mollitia eos! Quam quia nihil vitae quae voluptatum eius provident nam blanditiis.";

	let dropdownContainer = document.createElement("div");
	dropdownContainer.className = "grid-selector";

	let dropdown = document.createElement("select");
	dropdown.className = "grid-value-selector";
	dropdown.innerHTML = `<option value="1">2 / 10</option>
						  <option value="2">3 / 9</option>
						  <option value="3">4 / 8</option>
						  <option value="4">5 / 7</option>
						  <option value="5">6 / 6</option>
						  <option value="6">7 / 5</option>
						  <option value="7">8 / 4</option>
						  <option value="8">9 / 3</option>
						  <option value="9">10 / 2</option>`;

	let createButton = document.createElement("button");
	createButton.id = "CreateRow";
	createButton.className = "btn btn-success";
	createButton.innerText = "Add";
	createButton.addEventListener("click", generateRow);

	dropdownContainer.appendChild(dropdown);
	dropdownContainer.appendChild(createButton);

	creator.appendChild(header);
	creator.appendChild(helpText);
	creator.appendChild(dropdownContainer);

	rowCreatorContainer.appendChild(creator);

	document.body.appendChild(rowCreatorContainer);
}

function injectReportSelector() {
	if (document.querySelector(".report-selector__container") !== null) return;

	let reportSelectorContainer = document.createElement("div");
	reportSelectorContainer.className = "report-selector__container";

	let selector = document.createElement("div");
	selector.className = "report-selector-holder";

	let closeButton = document.createElement("a");
	closeButton.href = "#";
	closeButton.className = "close-button";
	closeButton.innerHTML = `<span class="icon-x-circle"></span>`;

	closeButton.addEventListener("click", function (e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		toggleReportSelector(false);
	});

	let header = document.createElement("div");
	header.className = "header";

	let title = document.createElement("p");
	title.className = "title";
	title.innerText = "Select Report";

	header.appendChild(closeButton);
	header.appendChild(title);

	let helpText = document.createElement("p");
	helpText.className = "help-text";
	helpText.innerText =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, inventore reiciendis? Distinctio illum cum exercitationem quo nihil perspiciatis mollitia eos! Quam quia nihil vitae quae voluptatum eius provident nam blanditiis.";

	let dropdownContainer = document.createElement("div");
	dropdownContainer.className = "grid-selector";

	let groupSelector = document.createElement("select");
	groupSelector.className = "report-group-selector-value";

	_axios({
		method: "get",
		url: "list",
	}).then(function (res) {
		let data = res.data;

		let groupsList = `<option value="-1">-----</option>`;

		for (let i = 0; i < data.length; i++) {
			const group = data[i];
			groupsList += `<option value="${group.id}">${group.title}</option>`;
		}

		groupSelector.innerHTML = groupsList;
	});

	groupSelector.addEventListener("change", function () {
		let groupId = this.options[this.selectedIndex].value;

		_axios({
			method: "get",
			url: "/getReports/" + groupId,
		}).then(function (res) {
			let data = res.data;

			let reportSelectorRef = document.querySelector(".report-selector-value");

			let reportsList = `<option value="-1">-----</option>`;

			for (let i = 0; i < data.length; i++) {
				const report = data[i];
				reportsList += `<option value="${report.id}">${report.title}</option>`;
			}

			reportSelectorRef.innerHTML = reportsList;
		});
	});

	let reportSelector = document.createElement("select");
	reportSelector.className = "report-selector-value";

	let createButton = document.createElement("button");
	createButton.id = "CreateRow";
	createButton.className = "btn btn-success";
	createButton.innerText = "Select Report";
	createButton.addEventListener("click", loadReport);

	dropdownContainer.appendChild(groupSelector);
	dropdownContainer.appendChild(reportSelector);
	dropdownContainer.appendChild(createButton);

	selector.appendChild(header);
	selector.appendChild(helpText);
	selector.appendChild(dropdownContainer);

	reportSelectorContainer.appendChild(selector);

	document.body.appendChild(reportSelectorContainer);
}

function loadReport() {
	let colReportContainer = selectedColRef.querySelector(".report__container");

	//remove old one
	let oldReport = colReportContainer.querySelector("div[data-box-id]");

	if (oldReport !== null) {
		oldReport.remove();
	}

	let reportSelector = document.querySelector(".report-selector-value");

	if (reportSelector.selectedIndex === -1) {
		alert("Please select a report.");
		return;
	}

	let reportId = reportSelector.options[reportSelector.selectedIndex].value;

	if (reportId === "-1") {
		alert("Please select a report.");
		return;
	}

	let newReportContainer = document.createElement("div");
	newReportContainer.setAttribute("data-box-id", reportId);

	colReportContainer.appendChild(newReportContainer);

	toggleReportSelector(false);

	setTimeout(() => {
		document.querySelector(".report-group-selector-value").selectedIndex = 0;
		reportSelector.innerHTML = "";
	}, 800);

	//TODO: call load for reports
}

function regenerateRow() {
	let rowSelector = document.querySelector(".grid-value-selector");
	let rowValue = rowSelector.options[rowSelector.selectedIndex].value;

	let cols = rowEditRef.querySelectorAll("div[class^='col-']");

	switch (rowValue) {
		case "1":
			cols[0].className = "col-md-2";
			cols[1].className = "col-md-10";
			break;

		case "2":
			cols[0].className = "col-md-3";
			cols[1].className = "col-md-9";
			break;

		case "3":
			cols[0].className = "col-md-4";
			cols[1].className = "col-md-8";
			break;

		case "4":
			cols[0].className = "col-md-5";
			cols[1].className = "col-md-7";
			break;

		case "5":
			cols[0].className = "col-md-6";
			cols[1].className = "col-md-6";
			break;

		case "6":
			cols[0].className = "col-md-7";
			cols[1].className = "col-md-5";
			break;

		case "7":
			cols[0].className = "col-md-8";
			cols[1].className = "col-md-4";
			break;

		case "8":
			cols[0].className = "col-md-9";
			cols[1].className = "col-md-3";
			break;

		case "9":
			cols[0].className = "col-md-10";
			cols[1].className = "col-md-2";
			break;
	}

	rowEditMode = false;
	rowEditRef = null;
	toggleRowCreator(false);
}

function generateRow() {
	if (rowEditMode) {
		regenerateRow();
		return;
	}

	let rowSelector = document.querySelector(".grid-value-selector");
	let rowValue = rowSelector.options[rowSelector.selectedIndex].value;

	let row = document.createElement("div");
	row.className = "row";

	let rowController = `<div class="row-controllers__container">
						<a href="#" class="move_down"
							><span class="icon-chevron-down"></span
						></a>
						<a href="#" class="move_up"
							><span class="icon-chevron-up"></span
						></a>	
						<a href="#" class="row_settings"
							><span class="icon-settings"></span
						></a>					
						<a href="#" class="row_remove"
							><span class="icon-x-circle"></span
						></a>
					</div>`;

	row.innerHTML = rowController;

	let reportsContainer = document.createElement("div");
	reportsContainer.className = "reports__container";

	let columns = "";

	switch (rowValue) {
		case "1":
			columns = `<div class="col-md-2"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div><div class="col-md-10"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div>`;
			break;

		case "2":
			columns = `<div class="col-md-3"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div><div class="col-md-9"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div>`;
			break;

		case "3":
			columns = `<div class="col-md-4"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div><div class="col-md-8"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div>`;
			break;

		case "4":
			columns = `<div class="col-md-5"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div><div class="col-md-7"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div>`;
			break;

		case "5":
			columns = `<div class="col-md-6"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div><div class="col-md-6"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div>`;
			break;

		case "6":
			columns = `<div class="col-md-7"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div><div class="col-md-5"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div>`;
			break;

		case "7":
			columns = `<div class="col-md-8"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div><div class="col-md-4"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div>`;
			break;

		case "8":
			columns = `<div class="col-md-9"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div><div class="col-md-3"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div>`;
			break;

		case "9":
			columns = `<div class="col-md-10"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div><div class="col-md-2"><div class="report__container"><a href="" class="col-settings"><span class="icon-settings"></span></a></div></div>`;
			break;
	}

	reportsContainer.innerHTML = columns;

	row.appendChild(reportsContainer);

	let rowsContainer = document.querySelector(".grid__container");
	let rows = rowsContainer.querySelectorAll(".row");

	if (rows.length > 0) {
		let lastRow = rows[rows.length - 1];
		lastRow.after(row);
	} else {
		rowsContainer.appendChild(row);
	}

	initiateDragula();
	bindEvents();
	toggleRowCreator(false);
}

document.querySelector(".edit-mode").addEventListener("click", function (e) {
	e.preventDefault();
	e.stopPropagation();

	injectRowCreatorButton();
	injectRowCreator();
	injectReportSelector();

	initiateDragula();
	bindEvents();

	if (document.body.classList.contains("edit-mode")) {
		document.body.classList.remove("edit-mode");
	} else {
		document.body.classList.add("edit-mode");
	}
});

document.querySelector(".save-changes").addEventListener("click", function (e) {
	e.preventDefault();

	//1- finds rows first
	//2- if it has children then add that to the row

	let rows = document.querySelectorAll(".grid__container .reports__container");

	let fullGrid = [];

	rows.forEach((row) => {
		let childs = row.querySelectorAll(`div[class^="col"]`);

		if (childs.length === 0) return;

		let colsList = [];

		childs.forEach((child) => {
			let reportBox = child.querySelector(`div[data-box-id]`);

			if (reportBox === null) {
				colsList.push({
					column: child.classList.toString(),
					reportId: null,
				});
			} else {
				let reportId = reportBox.getAttribute("data-box-id");

				if (reportId === null) return;

				colsList.push({
					column: child.classList.toString(),
					reportId: reportId,
				});
			}
		});

		if (colsList.length > 0) fullGrid.push(colsList);
	});

	_axios({
		method: "post",
		url: "/save",
		data: fullGrid,
	}).then(function (res) {
		alert("Changes has been saved.");
	});
});
