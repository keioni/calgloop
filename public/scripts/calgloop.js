
// let isZoomed = false;

function show_clock() {
  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  month = ( month < 10 ) ? '0' + month : month;
  let day = d.getDate();
  day = ( day < 10 ) ? '0' + day : day;
  let hour = d.getHours();
  hour = ( hour < 10 ) ? '0' + hour : hour;
  let min = d.getMinutes();
  min = ( min < 10 ) ? '0' + min : min;
  let sec = d.getSeconds();
  sec = ( sec < 10 ) ? '0' + sec : sec;
  const datetime = year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;

  console.log(datetime);
  const clock_div = document.getElementById('clock');
  clock_div.innerText = datetime;
}

// function zooming() {
//   const zoomButton = $(this);
//   const allCards = $(".card-draggable");
//   const card = $(this).closest(allCards);
//   if (isZoomed) {
//     const origMetrics = $('#orig-metrics-store');
//     let origMetricsArray = [];
//     if (origMetrics) {
//       origMetricsArray = origMetrics.text().split(',');
//     }
//     allCards.resizable("enable");
//     allCards.draggable("enable");
//     zoomButton.html('zoom_out_map');
//     card.css({
//       // position: 'absolute',
//       top: origMetricsArray[0],
//       left: origMetricsArray[1],
//       height: origMetricsArray[2],
//       width: origMetricsArray[3]
//     });
//     isZoomed = false;
//     origMetrics.text('');
//   }
//   else {
//     const margin = 50;
//     const cardTop = $(".site-header").height() + 20;
//     const winWidth = $(window).width();
//     const winHeight = $(window).height();
//     const origMetrics = [
//       card.css('top'),
//       card.css('left'),
//       card.css('width'),
//       card.css('height')
//     ];
//     $('#orig-metrics-store').text(origMetrics.join(','));
//     card.css({
//       position: 'absolute',
//       top: cardTop + margin,
//       left: margin,
//       width: winWidth - (margin * 2),
//       height: winHeight - (margin * 2),
//       cursor: 'default'
//     });
//     allCards.resizable("disable");
//     allCards.draggable("disable");
//     zoomButton.html('zoom_out');
//     isZoomed = true;
//   }
// }


const resizableOptions = {
  containment: 'parent',
  // alsoResize: '#gadget-sensing-canvas',
  resize: (event, ui) => {
    // const headerHeight = ui.clientHeight;
    // console.log(ui.size.height + " + " + headerHeight);
    // const canvas = $('#gadget-sensing-canvas');
    // canvas.css('width', ui.size.width + "px");
    // canvas.css('height', (ui.size.height - 500) + "px");
    // canvas.attr('width', ui.size.width);
    // canvas.attr('height', ui.size.height - headerHeight);
    myChart.resize();
  }
};

const draggableOptions = {
  containment: 'parent',
  // refreshPositions: true,
  // stack: ".card-draggable",
  // zIndex: 1000,
  // cursor: "move"
};

//   parentElement.css({
//     'width': ui.size.width,
//     'height': ui.size.height
//   })
// }

$(function () {
  show_clock();
  $('.resizable').resizable(resizableOptions);
  $('.draggable').draggable(draggableOptions);
// $(".zoomable").click(zooming);
});



// $(function () {
//   show_clock();
//   // setInterval(show_clock, 1000);
//   const allCards = $(".card-draggable");
//   allCards.draggable({
//     containment: 'parent',
//     scroll: false
//   });
//   allCards.mousedown(function () {
//     if (!isZoomed) {
//       allCards.css("z-index", 0);
//       $(this).css("z-index", 1);
//       $(this).css("cursor", "move");
//     }
//   });
//   allCards.mouseup(function () {
//     if (!isZoomed) {
//       $(this).css("cursor", "default");
//     }
//   });
//   $(".resizable").resizable();
//   $(".zoomable").click(zooming);
//   $("#gadget-sensing-canvas")
//     .on('resize', (event, ui) => {
//         $('#gadget-sensing').css({
//           width: ui.size.width - 16,
//           height: ui.size.height - 16,
//         })
//     })
// })
//

// $(function () {
//   show_clock();
//   // setInterval(show_clock, 1000);
//   const allCards = $(".card-draggable");
//   allCards.each((i, element) => {
//     $(element).css('z-index', i );
//   })
//   allCards.draggable({
//     containment: 'parent',
//     // refreshPositions: true,
//     // stack: ".card-draggable",
//     // zIndex: 1000
//   });
//   allCards.mousedown(function () {
//     if ( Number($(this).css("z-index")) != allCards.length) {
//       allCards.each((index, element) => {
//         const zIndex = $(element).css('z-index');
//         $(element).css('z-index', zIndex - 1);
//       })
//       $(this).css("z-index", allCards.length);
//     }
//   });
//   $(".resizable").resizable();
// })
