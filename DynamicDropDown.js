<script>

"use strict";
function _instanceof(left, right) {if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {return !!right[Symbol.hasInstance](left); } else {return left instanceof right; }}
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DropDown = /*#__PURE__*/function () {
  function DropDown(data) {
    _classCallCheck(this, DropDown);
    this.data = data;
    this.targets = [];
  }
  _createClass(DropDown, [{
    key: "filterData",
    value: function filterData(filtersAsArray) {
      return this.data.filter(function (r) {
        return filtersAsArray.every(function (item, i) {
          return item === r[i];
        });
      });
    }
  }, {
    key: "getUniqueValues",
    value: function getUniqueValues(dataAsArray, index) {
      var uniqueOptions = new Set();
      dataAsArray.forEach(function (r) {
        return uniqueOptions.add(r[index]);
      });
      return _toConsumableArray(uniqueOptions);
    }
  }, {
    key: "populateDropDown",
    value: function populateDropDown(el, listAsArray) {
      el.innerHTML = "";
      listAsArray.forEach(function (item) {
        var option = document.createElement("option");
        option.textContent = item;
        el.appendChild(option);
      });
    }
  }, {
    key: "createPopulateDropDownFunction",
    value: function createPopulateDropDownFunction(el, elsDependsOn) {
      var _this = this;
      return function () {
        var elsDependsOnValues = elsDependsOn.length === 0 ? null : elsDependsOn.map(function (depEl) {
          return depEl.value;
        });
        var dataToUse = elsDependsOn.length === 0 ? _this.data : _this.filterData(elsDependsOnValues);
        var listToUse = _this.getUniqueValues(dataToUse, elsDependsOn.length);
        _this.populateDropDown(el, listToUse);
        return _this;
      };
    }
  }, {
    key: "add",
    value: function add(options) {
      //{target : el, dependsOn: [] }
      var el = options.target;
      var elsDependsOn = options.dependsOn.length === 0 ? [] : options.dependsOn;
      var eventFunction = this.createPopulateDropDownFunction(el, elsDependsOn);
      var targetObject = {
        el: el,
        elsDependsOn: elsDependsOn,
        func: eventFunction
      };
      targetObject.elsDependsOn.forEach(function (depEl) {
        return depEl.addEventListener("change", eventFunction);
      });
      this.targets.push(targetObject);
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.targets.forEach(function (t) {
        return t.func();
      });
      return this;
    }
  }, {
    key: "eazyDropDown",
    value: function eazyDropDown(arrayOfElements) {
      var _this2 = this;
      arrayOfElements.forEach(function (item, i) {
        var option = {
          target: item,
          dependsOn: arrayOfElements.slice(0, i)
        };
        _this2.add(option);
      });
      this.initialize();
      return this;
    }
  }, {
    key: "eazyDropDownByIds",
    value: function eazyDropDownByIds(arrayOfIds) {
      this.eazyDropDown(arrayOfIds.map(function (id) {
        return document.getElementById(id);
      }));
    }
  }]);
  return DropDown;

}();
</script>


