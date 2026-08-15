/* A Digital Wilderness — a little light interactivity, nothing heavy. */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // close the menu after tapping a link
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Current year in the footer
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------------------------------------------------------------- friend map
  // Draws the world from assets/js/world-map-data.js and lights up whatever
  // countries are listed in #friend-countries. The list in the HTML is the
  // source of truth — this only reads it.
  var SVG_NS = "http://www.w3.org/2000/svg";
  var COUNTRIES_IN_THE_WORLD = 195; // UN members + observers

  // Natural Earth spells a few countries its own way. Everyday names on the
  // left, the map's name on the right.
  var ALIASES = {
    usa: "United States of America",
    us: "United States of America",
    america: "United States of America",
    unitedstates: "United States of America",
    unitedstatesofamerica: "United States of America",
    uk: "United Kingdom",
    greatbritain: "United Kingdom",
    britain: "United Kingdom",
    england: "United Kingdom",
    scotland: "United Kingdom",
    wales: "United Kingdom",
    northernireland: "United Kingdom",
    holland: "Netherlands",
    uae: "United Arab Emirates",
    emirates: "United Arab Emirates",
    czechrepublic: "Czechia",
    ivorycoast: "Côte d'Ivoire",
    cotedivoire: "Côte d'Ivoire",
    burma: "Myanmar",
    swaziland: "eSwatini",
    northmacedonia: "Macedonia",
    bosnia: "Bosnia and Herz.",
    bosniaandherzegovina: "Bosnia and Herz.",
    drc: "Dem. Rep. Congo",
    democraticrepublicofthecongo: "Dem. Rep. Congo",
    congokinshasa: "Dem. Rep. Congo",
    congobrazzaville: "Congo",
    republicofthecongo: "Congo",
    centralafricanrepublic: "Central African Rep.",
    dominicanrepublic: "Dominican Rep.",
    equatorialguinea: "Eq. Guinea",
    southsudan: "S. Sudan",
    westernsahara: "W. Sahara",
    easttimor: "Timor-Leste",
    solomonislands: "Solomon Is.",
    falklandislands: "Falkland Is.",
    turkiye: "Turkey",
    russianfederation: "Russia",
    southkorea: "South Korea",
    republicofkorea: "South Korea",
    northkorea: "North Korea",
    dprk: "North Korea",
    capeverde: "Cabo Verde",
    vatican: "Vatican City",
    saotomeandprincipe: "São Tomé and Príncipe"
  };

  // "Côte d'Ivoire" and "cote divoire" should be the same key.
  function key(name) {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z]/g, "");
  }
  function canonical(name) {
    var k = key(name);
    return key(ALIASES[k] || name);
  }

  function drawFriendMap() {
    var canvas = document.getElementById("friendmap-canvas");
    var list = document.getElementById("friend-countries");
    var data = window.WORLD_MAP;
    if (!canvas || !list || !data) return;

    var items = [].slice.call(list.querySelectorAll("li"));
    var friends = {};
    items.forEach(function (li) {
      friends[canonical(li.textContent.trim())] = true;
    });
    var wantedName = list.getAttribute("data-wanted") || "";
    var wanted = wantedName ? canonical(wantedName) : null;

    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + data.width + " " + data.height);
    svg.setAttribute("class", "friendmap__svg");
    svg.setAttribute("role", "img");
    svg.setAttribute(
      "aria-label",
      "World map with " + items.length + " countries highlighted. The same countries are listed below."
    );

    var wantedPath = null;
    var drawn = {};
    var frag = document.createDocumentFragment();

    data.countries.forEach(function (country) {
      var el = document.createElementNS(SVG_NS, "path");
      var k = canonical(country.n);
      el.setAttribute("d", country.d);
      el.setAttribute("class", "cn" + (friends[k] ? " is-friend" : "") + (k === wanted ? " is-wanted" : ""));
      el.setAttribute("data-name", country.n);
      if (friends[k]) drawn[k] = true;
      if (k === wanted) wantedPath = el;
      var title = document.createElementNS(SVG_NS, "title");
      title.textContent = country.n + (friends[k] ? " (a friend here)" : "");
      el.appendChild(title);
      frag.appendChild(el);
    });

    // Countries too small to have an outline at this scale get a dot.
    data.points.forEach(function (point) {
      var k = canonical(point.n);
      if (!friends[k] && k !== wanted) return;
      var dot = document.createElementNS(SVG_NS, "circle");
      dot.setAttribute("cx", point.x);
      dot.setAttribute("cy", point.y);
      dot.setAttribute("r", 3.2);
      dot.setAttribute("class", "cn cn--dot is-friend");
      dot.setAttribute("data-name", point.n);
      drawn[k] = true;
      var dotTitle = document.createElementNS(SVG_NS, "title");
      dotTitle.textContent = point.n + " (a friend here)";
      dot.appendChild(dotTitle);
      frag.appendChild(dot);
    });

    svg.appendChild(frag);
    canvas.appendChild(svg);

    // If something in the list doesn't match a country on the map (usually a
    // typo), say so in the console rather than silently dropping it.
    var missed = items
      .map(function (li) { return li.textContent.trim(); })
      .filter(function (n) { return !drawn[canonical(n)]; });
    if (missed.length && window.console) {
      console.warn("Friend map: no country on the map matches " + missed.join(", "));
    }

    // A ring around the country I'm still looking for.
    if (wantedPath) {
      var box = wantedPath.getBBox();
      var ring = document.createElementNS(SVG_NS, "circle");
      ring.setAttribute("cx", box.x + box.width / 2);
      ring.setAttribute("cy", box.y + box.height / 2);
      ring.setAttribute("r", Math.max(box.width, box.height) / 2 + 7);
      ring.setAttribute("class", "friendmap__ring");
      svg.appendChild(ring);
    }

    // Tally line under the map.
    var tally = document.getElementById("friendmap-tally");
    var left = COUNTRIES_IN_THE_WORLD - items.length;
    if (tally) {
      tally.textContent =
        items.length + (items.length === 1 ? " country" : " countries") +
        " so far, " + left + " to go.";
    }

    // Hovering a country names it in the caption, without moving anything.
    var caption = document.getElementById("friendmap-caption");
    var hover = document.createElement("span");
    hover.className = "friendmap__hover";
    if (caption) caption.appendChild(hover);

    function name(e) {
      var target = e.target.closest ? e.target.closest(".cn") : null;
      hover.textContent = target ? target.getAttribute("data-name") : "";
      hover.classList.toggle("is-friend", !!target && target.classList.contains("is-friend"));
    }
    svg.addEventListener("pointerover", name);
    svg.addEventListener("pointerout", function (e) {
      if (!svg.contains(e.relatedTarget)) hover.textContent = "";
    });
    svg.addEventListener("pointerleave", function () {
      hover.textContent = "";
    });
  }

  drawFriendMap();
})();
