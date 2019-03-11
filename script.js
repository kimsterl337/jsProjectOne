$(function (){

let arrayItemsList = []; 
let arrayItemsCost = [];
let arrayItemsCount = [];
let arrayItemsTotal = [];
let counter = 0;
let totalSum = 0;



$('form').on('submit',function(){

	event.preventDefault();
	var tempItemName = $('#idItemName').val();
	var tempItemCost = parseInt($('#idItemCost').val());
	var tempItemCount = parseInt($('#idItemCount').val());
	var tempItemTotal = tempItemCount * tempItemCost;
	var tempItemTax = 1 + parseFloat($('#idItemTax').val());
	console.log(tempItemTax);
	let runningTotal = 0;
	let runningCount = 0;

	arrayItemsCount.push(tempItemCount);
	arrayItemsList.push(tempItemName);
	arrayItemsCost.push(tempItemCost);
	arrayItemsTotal.push(tempItemTotal);
	listAppend(arrayItemsCount, arrayItemsList ,arrayItemsCost, arrayItemsTotal);
	

	for (let i = 0; i < arrayItemsList.length; i++) {
		runningTotal = runningTotal + (arrayItemsTotal[i]);
		runningCount = runningCount + (arrayItemsCount[i]);
		}

	
	updateTotal(runningCount, runningTotal, tempItemTax);

	counter = counter + 1;
	
	$('#idItemCount').val('');
	$('#idItemName').val('');
	$('#idItemCost').val('');

	updateClientInfo();
});


$('.item-delete ul').on('click','.btn-delete',function(){

	var deleteButtonVal = $(this).attr('id');
	var tempItemTax = 1 + parseFloat($('#idItemTax').val());
	let runningTotal = 0;
	let runningCount = 0;


	arrayItemsCount.splice(deleteButtonVal, 1);
	arrayItemsList.splice(deleteButtonVal, 1);
	arrayItemsCost.splice(deleteButtonVal, 1);
	arrayItemsTotal.splice(deleteButtonVal, 1);

	listDelete(deleteButtonVal);

	$('.item-delete ul li').each(function(index){
		$(this).attr('id', `delete${index}`);
	});
	
	$('.item-delete ul li button').each(function(index){
		$(this).attr('id', `${index}`);
	});

	$('.item-count ul li').each(function(index){
		$(this).attr('id', `count${index}`);
	});

	$('.item-lists ul li').each(function(index){
		$(this).attr('id', `lists${index}`);
	});

	$('.item-cost ul li').each(function(index){
		$(this).attr('id', `cost${index}`);
	});

	$('.item-total ul li').each(function(index){
		$(this).attr('id', `total${index}`);
	});


	for (let i = 0; i < arrayItemsList.length; i++) {
		runningTotal = runningTotal + (arrayItemsTotal[i]);
		runningCount = runningCount + (arrayItemsCount[i]);
		}

	updateTotal(runningCount, runningTotal, tempItemTax);

	counter = counter - 1;

});

function listDelete (position) {
	$(`#${counter}`).remove();
	$(`#delete${position}`).remove();
	$(`#count${position}`).remove();
	$(`#lists${position}`).remove();
	$(`#cost${position}`).remove();
	$(`#total${position}`).remove();
}

function listAppend (count, item, cost, total) {
	$('.item-delete ul').append(`<li id=delete${counter}><button class='btn-delete' id=${counter}><i class="far fa-trash-alt"></i></button></li>`)
	$('.item-count ul').append(`<li id=count${counter}>${count[counter]}</li>`);
	$('.item-lists ul').append(`<li id=lists${counter}>${item[counter]}</li>`);
	$('.item-cost ul').append(`<li id=cost${counter}>${cost[counter]}</li>`);
	$('.item-total ul').append(`<li id=total${counter}>${total[counter]}</li>`);
}

function updateTotal (count, total, tax) {
	$('.item-count p').html(count);
	$('.item-total p').html(total);
	$('#afterTax').html((total * tax).toFixed(2));
	$('.item-cost p').html((total/count).toFixed(2));
}

function updateClientInfo (){
	let tempFirstName = $('#idFirstName').val();
	let tempLastName = $('#idLastName').val();
	let tempAddress = $('#idAddress').val();
	let tempCity = $('#idCity').val();
	let tempPostalCode = $('#idProvince').val();

	$('.clientName').html(tempFirstName + ' ' + tempLastName);
	$('.clientFirstAddress').html(tempAddress);
	$('.clientSecondAddress').html(tempCity + ' ' + tempPostalCode);


}

});
