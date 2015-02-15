/*
Table Calculator Application
Author: Andrew Larson
Date: 2/15/15

Description:
	Manages a table 7 columns wide, where the first six columns are totalled by row and column.
	The value of cells in column 1 are multiplied by 1, in column 2 by 2, etc, until column
	6 values are multiplied by 6.
	The totals are displayed in Currency.
	When the final editable row currently displayed is edited, another row for user input is
	dynamically inserted.
*/

var app = angular.module('myApp',[]);
	
	// controller for table management and scope containment
	app.controller('tableController', function($scope){
		
		$scope.rows = [
			{Col1: 0, Col2: 0, Col3: 0, Col4: 0, Col5: 0, Col6: 0, Col7:0}
		]; // array of objects for each row

		$scope.rowTotals = {Col1: 0, Col2: 0, Col3: 0, Col4: 0, Col5: 0, Col6: 0}; // object containing the column totals
		
		// this function adds a new row to the table
		$scope.newRow = function () {
			var newRow = {Col1: 0, Col2: 0, Col3: 0, Col4: 0, Col5: 0, Col6: 0, Col7: 0};
			$scope.rows.push(newRow);
		};
		
		// this function updates the Total Row's values, multiplying the values of each column according to requirements
		$scope.sumCol = function (){
			$scope.rowTotals = {Col1: 0, Col2: 0, Col3: 0, Col4: 0, Col5: 0, Col6: 0, Col7: 0};
			for(var i = 0; i < $scope.rows.length; i++){
				$scope.rowTotals.Col1+=parseFloat($scope.rows[i].Col1,10);
				$scope.rowTotals.Col2+=parseFloat($scope.rows[i].Col2,10)*2;
				$scope.rowTotals.Col3+=parseFloat($scope.rows[i].Col3,10)*3;
				$scope.rowTotals.Col4+=parseFloat($scope.rows[i].Col4,10)*4;
				$scope.rowTotals.Col5+=parseFloat($scope.rows[i].Col5,10)*5;
				$scope.rowTotals.Col6+=parseFloat($scope.rows[i].Col6,10)*6;
				$scope.rowTotals.Col7+=parseFloat($scope.rows[i].Col7,10);
			}
		};
		
		// this function updates the Total Column's values, multiplying the values of each column according to requirements
		// and also checks to see if the final row was edited to add a new row if necessary
		$scope.sumRow = function (){
			for(var i = 0; i < $scope.rows.length; i++){
				$scope.rows[i].Col7=parseFloat($scope.rows[i].Col1,10)+parseFloat($scope.rows[i].Col2,10)*2+parseFloat($scope.rows[i].Col3,10)*3+parseFloat($scope.rows[i].Col4,10)*4+parseFloat($scope.rows[i].Col5,10)*5+parseFloat($scope.rows[i].Col6,10)*6;
				if(i===$scope.rows.length-1) // triggers on reaching the final row to check if edited
					if($scope.rows[i].Col1!==0||$scope.rows[i].Col2!==0||$scope.rows[i].Col3!==0||$scope.rows[i].Col4!==0||$scope.rows[i].Col5!==0||$scope.rows[i].Col6!==0)
							$scope.newRow();
			}
		};
		
		// this function triggers ever time a cell is edited to update the column and row totals
		$scope.update = function (){
			$scope.sumRow();
			$scope.sumCol();
		};
	});
