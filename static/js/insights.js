var g_insight_id = 0;
var insight_bubbles = {};

function displayInsight(insight) {
    // Deprecated -- for testing only
    //
    g_insight_id++;
    var element_id = 'insight_bubble_' + g_insight_id;
    var new_bubble = $('#empty_insight').clone();
    //$('.insight-text', new_bubble).innerHTML = insight['text'];
    new_bubble.attr('id', element_id);
    new_bubble.appendTo('.insights-container');
    new_bubble.css('display', 'block');
    document.getElementById(element_id).innerHTML = '<h1>' + insight['text'] + '</h1>';
}

    /*sys.addEdge('a','b');
    sys.addEdge('a','c');
    sys.addEdge('a','d');
    sys.addEdge('a','e');
    sys.addNode('f', {alone:true, mass:.25});*/

var sys = null;

function initParticleSystem() {
    if (!sys) {
        sys = arbor.ParticleSystem(1000, 600, 0.5) // create the system with sensible repulsion/stiffness/friction
    }
}
 
function displayInsights(insights) {
    initParticleSystem();
    sys.parameters({gravity:true}) // use center-gravity to make the graph settle nicely (ymmv)
    sys.renderer = Renderer("#viewport"); // our newly created renderer will have its .init() method called shortly by sys...
 
    for (var i = 0; i < insights.length; i++) {
        sys.addNode(i.toString(), {
            label: insights[i].text,
            link: "",
            alone: true, mass: 0.9, color: "#b2b19d"});
        displayInsight(insights[i]);
    }
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

function updateEdges() {
    $.ajax({
        'url' : '/edges',
        'type' : 'GET',
        'dataType' : 'JSON',
        'success' : onEdgesReceive,
        'error' : genericError
    });
}

function addEdge(a_id, b_id) {
    $.ajax({
        'type' : 'POST',
        'url'  : '/addedge',
        'dataType' : 'JSON',
        'data' : {
            'a_id' : JSON.stringify(a_id),
            'b_id' : JSON.stringify(b_id)
        },
        'success' : onAddEdgeSuccess(),
        'error' : genericError
    });
}

function filterGems() {
    filter = $("#search").val();
    sys.eachNode(function(node, pt) {
        if (node.data.label.indexOf(filter) == -1) {
            node.data.alpha = 0;
        } else {
            node.data.alpha = true;
        }
    });
}

function onAddEdgeSuccess(data, textStatus, jqXHR) {
}

function onInsightsReceive(data, textStatus, jqXHR) {
    insights = data;
    displayInsights(insights);
}

function onEdgesReceive(data, textStatus, jqXHR) {
    initParticleSystem();
    edges = data;
    for (var i = 0; i < edges.length; i++) {
        a_id = edges[i].insight_a_id;
        b_id = edges[i].insight_b_id;
        sys.addEdge(a_id, b_id);
    }
}

$(document).ready(function() {
    updateInsights();
    updateEdges();
    $("#search").bind('keyup', filterGems);
});

