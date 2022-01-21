
var tbody = $("tbody");
var AllData;
function Data(){
  $.get("products.json",function(data){
    AllData = data;
    console.log(AllData)
     table(AllData)
  })
}
Data()
function table(AllData){
    AllData.forEach(element =>{
      var ul = document.createElement("ul");
      element.disponibilité.forEach(av => {
          var li = document.createElement("li");
          li.innerHTML = av;
          ul.appendChild(li);
      })
        var info_fournisseur = "<li>" + element.fournisseur["Raison-Sociale"] + "</li>"+ '<br>' + "<li>" + element.fournisseur["Adresse"] + "</li>";
        $('#tbody').append($('<tr>')
        .append($('<td scope="row">').append(element.ID))
        .append($('<td>').append(element.désignation))
        .append($('<td>').append(element.prix))
        .append($('<td>').append(element.catégorie))
        .append($('<td>').append(ul.innerHTML))
        .append($('<td>').append(info_fournisseur))
        )
    })
}
$(document).ready(function(){
  var search1 = document.getElementById("#search")
    $("#search").on("keyup",function(){
      // var lst = [];
      // AllData.forEach(element=>{
      //   if(element.catégorie.includes(search1.val())){
      //     lst.push(element)
      //   }
      // })
      // $("#tbody").html("")
      // table(lst)
      var value = $(this).val().toLowerCase();
      $("#tbody tr").filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)

      });
    });
});


//////pagination
$(document).ready(function() {
  var rowsPerPage = 5;
	var rows = $('#table tbody tr');
	var rowsCount = rows.length;
	var pageCount = Math.ceil(rowsCount / rowsPerPage); // avoid decimals
	var numbers = $('#numbers');
	
	for (var i = 0; i < pageCount; i++) {
		numbers.append('<li><a href="#">' + (i+1) + '</a></li>');
	}	
	$('#numbers li:first-child a').addClass('active');

	displayRows(1);
	
	// click on pagination 
	$('#numbers li a').click(function(e) {
		var $this = $(this);		
		e.preventDefault();
		$('#numbers li a').removeClass('active');
		$this.addClass('active');
    // Show the rows corresponding to the clicked page ID.
		displayRows($this.text());
	});
	
	// Function that displays rows for a specific page.
	function displayRows(index) {
		var start = (index - 1) * rowsPerPage;
		var end = start + rowsPerPage;
		
		// Hide all rows.
		rows.hide();
		rows.slice(start, end).show();
	}
});

////////////////////sort table///////////////////////////
function sort_Table(e, direction){
  var sort_tbl= e.parentElement.innerText.trim(); 
  if(direction == "desc"){
    AllData.sort(function(a,b){
          if(a[sort_tbl].toLowerCase() > b[sort_tbl].toLowerCase()){
            return -1
          }
          
      })
  }
  else{
    AllData.sort(function(a,b){
          if(a[sort_tbl].toLowerCase() < b[sort_tbl].toLowerCase()){
            return -1
          }
      })
  }
  document.getElementById("tbody").innerHTML=""
  table(AllData)
 
}

function sort_Table_nbr(e,direction){
  var sort_tbl= e.parentElement.innerText.trim(); 
  if(direction == "desc"){
    AllData.sort(function(a,b){
      if(a[sort_tbl] > b[sort_tbl]){
        return -1
      }
      
  })
  }
  else{
    AllData.sort(function(a,b){
          if(a[sort_tbl] < b[sort_tbl]){
            return -1
          }
      })
  }
  document.getElementById("tbody").innerHTML=""
  table(AllData)
}