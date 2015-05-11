$(document).ready(function(){
	
	var items = $('#stage li'),
		itemsByTags = {};
	
	// Looping though all the li items:
	
	items.each(function(i){
		var elem = $(this),
			tags = elem.data('tags').split(',');
		
		// Adding a data-id attribute. Required by the Quicksand plugin:
		elem.attr('data-id',i);
		
		$.each(tags,function(key,value){
			
			// Removing extra whitespace:
			value = $.trim(value);
			
			if(!(value in itemsByTags)){
				// Create an empty array to hold this item:
				itemsByTags[value] = [];
			}
			
			// Each item is added to one array per tag:
			itemsByTags[value].push(elem);
		});
		
	});

	// Creating the "Everything" option in the menu:
	var cont = 0.2;
	createList('Everything',items,cont);
	// Looping though the arrays in itemsByTags:
	$.each(itemsByTags,function(k,v){
		cont = cont + 0.2;
		cont = Math.round(cont*100)/100;
		createList(k,v,cont);
	});
	
	$('#filter a').live('click',function(e){
		var link = $(this);
		
		link.addClass('active').siblings().removeClass('active');
		
		// Using the Quicksand plugin to animate the li items.
		// It uses data('list') defined by our createList function:
		
		$('#stage').quicksand(link.data('list').find('li'));
		e.preventDefault();
	});
	
	$('#filter a:first').click();
	
	function createList(text,items,count){
		
		// This is a helper function that takes the
		// text of a menu button and array of li items
		
		// Creating an empty unordered list:
		var ul = $('<ul>',{'class':'hidden'});
		
		$.each(items,function(){
			// Creating a copy of each li item
			// and adding it to the list:
			
			$(this).clone().appendTo(ul);
		});

		ul.appendTo('#portfolio');

		// Creating a menu item. The unordered list is added
		// as a data parameter (available via .data('list'):}
		var i = 0.2;
		var a = $('<a>',{
			html: text,
			href:'#',
			data: {list:ul},
			class: 'wow bounceIn'
		}).attr('data-wow-delay',count+'s').appendTo('#filter');
		i++;
	}
});