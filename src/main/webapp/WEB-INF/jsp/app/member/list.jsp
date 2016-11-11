<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/app/member/list.js"></script>
<style type="text/css">
    #map {
        height: 350px;
        margin: 0 20px 20px 20px;
    }
</style>
<div class="row">
    <div id="map"></div>
</div>
<div class="m-b-md">
  <form class="form-inline" role="form" id="searchForm"
        name="searchForm">
      <div class="form-group">
          <label class="control-label"> <span
                  class="h4 font-thin v-middle">名称:</span></label> <input
              class="input-medium ui-autocomplete-input" id="name"
              name="memberFormMap.name">
      </div>
      <div class="form-group">
          <label class="control-label"> <span
                  class="h4 font-thin v-middle">组织:</span></label> <input
              class="input-medium ui-autocomplete-input" id="meetup"
              name="memberFormMap.meetup">
      </div>
       <div class="form-group">
          <label class="control-label"> <span
                  class="h4 font-thin v-middle">国家:</span></label> <input
              class="input-medium ui-autocomplete-input" id="country"
              name="memberFormMap.country">
      </div>
      <div class="form-group">
          <label class="control-label"> <span
                  class="h4 font-thin v-middle">地区:</span></label> <input
              class="input-medium ui-autocomplete-input" id="region"
              name="memberFormMap.region">
      </div>
    <a href="javascript:void(0)" class="btn btn-info" id="search">查询</a>
  </form>
</div>

<header class="panel-heading">
    <div class="doc-buttons">
        <c:forEach items="${res}" var="key">
            ${key.description}
        </c:forEach>
    </div>
</header>

<div class="table-responsive">
  <div id="paging" class="pagclass"></div>
</div>
<script>
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            // center: {lat: 39.80, lng: 116.23}, // Beijing
            zoom: 8
        });
       /*  var g = grid.getCurrentData();
        for(var i in g){  
            alert(g[i].locality);  
        }   */
    }
</script>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJAZFHarSBlboid2Qlv4FyVh3QmIL3Y2Q&callback=initMap">
</script>