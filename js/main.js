"use strict"

/**
 * инициализация всех инициализаций
 */

$(document).ready(function()
{
	o2.init();
});

/**
 * основной объект
 * @type {object}
 */
var o2 =
{
	/**
	 * вызов функций, которые должны запускаться при загрузке страницы
	 */
	init: function()
	{
		console.log('стартовый шаблон');
		this.rangeSlider.init();
	},
	currentID:0,
	items:
	[
		{
			percent1:25,
			percent2:5,
			percent:30,
			name: "Средний уровень риска"
		},
		{
			percent1:15,
			percent2:5,
			percent:20,
			name: "Средний уровень риска"
		},
		{
			percent1:15,
			percent2:0,
			percent:15,
			name: "Соотношением доходности"
		},
		{
			percent1:9,
			percent2:0,
			percent:9,
			name: "Модельный портфель"
		},
		{
			percent1:15,
			percent2:5,
			percent:20,
			name: "Модельный риск"
		},
		{
			percent1:25,
			percent2:5,
		 	percent:30,
		 	name: "Портфель уровень риска"
		 }
	],
	/*
	Убирает пробелы между цифрами для правильного счета
	 */
	parseNum: function(number)
    {
      number = String(number);
      return number.replace(/\s+/g, '');
    },
    /*
	Разделяет тысячи
	 */
    prettify: function(num)
	{
		var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    },
    /*
	Расчет значений в таблице
	 */
    calculation: function(id)
    {
    	let all100perc = $('#all100').text();
		let all25perc = $('#all25').text(o2.prettify((o2.parseNum(all100perc) * (this.items[id].percent1 / 100)).toFixed(0)));//второй столбец вторая строка
		let all5perc = $('#all5').text(o2.prettify((o2.parseNum(all100perc) * (this.items[id].percent2 / 100)).toFixed(0)));//второй столбец 3 строка
		$('#allsum').text(o2.prettify(parseInt(o2.parseNum(all100perc)) + parseInt(o2.parseNum(all25perc.text())) + parseInt(o2.parseNum(all5perc.text()))));
    },
    /*
	Добавление процентов в таблице после расчитанных цифр
	 */
    dinamicPercent: function(id)
    {
    	$('.income__percent').text(this.items[id].percent1 + '%');
		$('.income__perc').text(this.items[id].percent2 + '%');
		$('.income__dop-perc-sum').text(this.items[id].percent +'%');
    },
    /*
	Скрыть и показать блок от уловия есть ли в нем 0 или нет узнаем из массива
	 */
    hideBlock: function(id)
    {
    	if(this.items[id].percent2 == 0)
		{
			$('.income-last').hide();
		}
		else
		{
			$('.income-last').show();
		}
    },
    /*
	Вставить соответсвующие значения значения в селектор
	 */
    percentInSelector: function(id)
    {
    	$('.income__ispercenttest').text(this.items[id].percent + '%');
		$('.income__calc-middletest').text(this.items[id].name);
    },
    /*
	При выборе значений в селекторе
	Расчетываем значения в таблице
	Прописываем везде дополнительные проценты
	 */
	replacement: function(instance,id)
	{
		let dataID  = $(instance).data('id');
		o2.percentInSelector(dataID);
		let scr = $('.strategy__strategy-portfolio[data-id='+ dataID + ']').hide();
		let press = $(instance);
		let scrH = scr.html();
		let newInformation = $('.income__strategy-foot').html(scrH);
		if(press)
		{
			$('.income__list-item').show();
			$('.strategy__strategy-portfolio').show();
			press.hide();
			scr.hide();
		}
		//Расчитываем значения в таблице
		o2.calculation(dataID);
		//Добавляем проценты в таблице
		o2.dinamicPercent(dataID);
		o2.currentID = dataID;
		//Скрываем последний блок в таблице если там 0
		o2.hideBlock(dataID);
	},
	/*
	При выборе значений в карточках
	Расчетываем значения в таблице
	Прописываем везде дополнительные проценты
	 */
	substitution: function(instance,id)
	{
		let htmlInformation = $(instance).parents('.strategy__strategy-portfolio');
		//html нажатого блока
		let myID = htmlInformation.data('id');
		let newInformation = $('.income__strategy-foot').html(htmlInformation.html());
		let pressed = $(instance);
		let scr = $('.income__list-item[data-id='+ myID + ']').hide();
		if(pressed)
		{
			$('.strategy__strategy-portfolio').show();
			$('.income__list-item').show();
			htmlInformation.hide();
			scr.hide();
		}
		//Расчитываем значения в таблице
		o2.calculation(myID);
		//Вставляем соответствующее значение в селектор
		o2.percentInSelector(myID);
		//Добавляем проценты в таблице
		o2.dinamicPercent(myID);
		o2.currentID = myID;
		//Скрываем последний блок в таблице если там 0
		o2.hideBlock(myID);
	},
	/*
	Раскрываение селектора
	 */
	toggleUl: function(instance, id)
	{
		$(instance).find('.income__list').toggleClass('active');
		if($('.income__list').hasClass('active'))
		{
			$('._vector-2').addClass('income__rotate');

		}else
		{
			$('._vector-2').removeClass('income__rotate');
		}
	},
	/*
	Слайдер
	При изменение ползунка изменяются и значения в инпутах
	 */
	rangeSlider:
	{
		init()
		{
			let nonLinearSlider = document.getElementById('income__slider');
			noUiSlider.create(nonLinearSlider,
			{
	    		connect: [true,false],
			    behaviour: 'tap',
			    start: [400000],
			    range:
			    {
			        'min': [50000],
			        'max': [900000]
	    		}
			});
			inp.onclick = function()
			{
				inp.value = null;
			}
			input.onclick = function()
			{
				input.value = null;
			}
			nonLinearSlider.noUiSlider.on('update', function (values, handle)
			{
		    	let value = +values[handle];
    			$('#input').val(value.toFixed(0));
    			let valueInp = Number($('#input').val());
    			$('#inp').val((valueInp / 12).toFixed(0));
    			let valInp = Number($('#inp').val());
    			$('#all100').text(valueInp);
    			let all100 = $('#all100').text();
    			$('#all25').text((all100 * (o2.items[o2.currentID].percent1/100)).toFixed(0));
    			let all25 = $('#all25').text();
    			$('#all5').text((all100 * (o2.items[o2.currentID].percent2/100)).toFixed(0));
    			let all5 = $('#all5').text();
    			//ставим пробелы в каждой тысяче
				$('#input').val(valueInp.toLocaleString('ru-RU'));
				$('#inp').val(valInp.toLocaleString('ru-RU'))
    			$('#allsum').text(o2.prettify(+all100 + +all25 + +all5));
    			$('#all100').text(o2.prettify(valueInp));
    			$('#all25').text(o2.prettify((all100 * (o2.items[o2.currentID].percent1/100)).toFixed(0)));
    			$('#all5').text(o2.prettify((all100 * (o2.items[o2.currentID].percent2/100)).toFixed(0)));
			});
			$('#input').on('change', function ()
			{
    			nonLinearSlider.noUiSlider.set(this.value);
			});
			$('#inp').on('change', function ()
			{
				$('#input').val($('#inp').val()*12);
    			nonLinearSlider.noUiSlider.set($('#input').val());
			});
		},
	}
}