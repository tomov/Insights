var g_insight_id = 0;
var insight_bubbles = {};

function displayInsight(insight) {
    g_insight_id++;
    var element_id = 'insight_bubble_' + g_insight_id;
    var new_bubble = $('#empty_insight').clone();
    $('.insight-text', new_bubble).innerHTML = insight['text'];
    new_bubble.attr('id', element_id);
    new_bubble.appendTo('.insights-container');
    new_bubble.css('display', 'block');
    document.getElementById(element_id).innerHTML = '<h1>' + insight['text'] + '</h1>';
}

function updateInsights() {
    $.ajax({
        'url' : '/insights',
        'type' : 'GET',
        'dataType' : 'JSON',
        'success' : onInsightsReceive,
        'error' : genericError
    });
}

function onInsightsReceive(data, textStatus, jqXHR) {
    insights = data;

    //var tmp = JSON.stringify(data);
    //document.getElementById('test').innerHTML = tmp;

    for (var i = 0; i < insights.length; i++)
    {
        displayInsight(insights[i]);
    }
}

$(document).ready(function() {
    updateInsights();
});

