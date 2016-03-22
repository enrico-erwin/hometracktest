var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

var defaultRequest = {
	'payload': [
		{
			'address': {
				'buildingNumber': '28',
				'lat': -33.912542000000002,
				'lon': 151.00293199999999,
				'postcode': '2198',
				'state': 'NSW',
				'street': 'Donington Ave',
				'suburb': 'Georges Hall'
			},
			'propertyTypeId': 3,
			'readyState': 'init',
			'reference': 'aqsdasd',
			'shortId': '6Laj49N3PiwZ',
			'status': 0,
			'type': 'htv',
			'workflow': 'pending'
		},
		{
			'address': {
				'buildingNumber': 'Level 6',
				'postcode': '2060',
				'state': 'NSW',
				'street': '146 Arthur Street',
				'suburb': 'North Sydney'
			},
			'propertyTypeId': 3,
			'readyState': 'init',
			'reference': 'asdasd',
			'shortId': 'E9eQVYEMkub2',
			'status': 4,
			'type': 'htv',
			'valfirm': null,
			'workflow': 'completed'
		},
		{
			'address': {
				'buildingNumber': '25',
				'postcode': '4000',
				'state': 'QLD',
				'street': 'Mary St',
				'suburb': 'Brisbane'
			},
			'propertyTypeId': 3,
			'readyState': 'init',
			'reference': 'asdas',
			'shortId': 'nQMyWWLBvu4A',
			'status': 1,
			'type': 'avm',
			'workflow': 'pending'
		},
		{
			'address': {
				'buildingNumber': '92',
				'postcode': '2000',
				'state': 'NSW',
				'street': 'Pitt Street',
				'suburb': 'Sydney',
				'unitNumber': 'Suite 1 Level 8'
			},
			'propertyTypeId': 3,
			'readyState': 'complete',
			'reference': 'asdasd',
			'shortId': 'ZM73nE4nKH56',
			'status': 4,
			'type': 'avm',
			'workflow': 'cancelled'
		},
		{
			'address': {
				'buildingNumber': '28',
				'lat': -33.912542000000002,
				'lon': 151.00293199999999,
				'postcode': '2198',
				'state': 'NSW',
				'street': 'Donington Ave',
				'suburb': 'Georges Hall'
			},
			'propertyTypeId': 3,
			'readyState': 'complete',
			'reference': 'asdasdas',
			'shortId': 'AQzAB5xMXFNx',
			'status': 3,
			'type': 'avm',
			'workflow': 'completed'
		},
		{
			'address': {
				'buildingNumber': '360',
				'postcode': '3000',
				'state': 'VIC',
				'street': 'Elizabeth St',
				'suburb': 'Melbourne',
				'unitNumber': 'Level 28'
			},
			'propertyTypeId': 3,
			'readyState': 'complete',
			'reference': 'asdas',
			'shortId': 'yebZvgdA7FRk',
			'status': 1,
			'type': 'htv',
			'workflow': 'completed'
		},
		{
			'address': {
				'buildingNumber': '153',
				'postcode': '2229',
				'state': 'NSW',
				'street': 'Denman Avenue',
				'suburb': 'CARINGBAH',
				'unitNumber': 'Suite 7'
			},
			'propertyTypeId': 3,
			'readyState': 'complete',
			'reference': 'asdas',
			'shortId': 'YP7NJVNpVCdr',
			'status': 4,
			'type': 'htv',
			'workflow': 'cancelled'
		}
	]
}

describe('endpoints', function() {
	it('POST / should filter by type="htv" and workflow="completed"', function(done){
		chai.request(server)
			.post('/')
			.send(defaultRequest)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				expect(res.body.response.length).to.equal(2);

				expect(res.body.response[0].concataddress).to.equal('Level 6 146 Arthur Street North Sydney NSW 2060');
				expect(res.body.response[0].type).to.equal('htv');
				expect(res.body.response[0].workflow).to.equal('completed');

				expect(res.body.response[1].concataddress).to.equal('Level 28 360 Elizabeth St Melbourne VIC 3000');
				expect(res.body.response[1].type).to.equal('htv');
				expect(res.body.response[1].workflow).to.equal('completed');

				done();
			});
	});


  	it('POST / should return error when JSON supplied is not valid', function(done){
		chai.request(server)
			.post('/')
			.send('{"random": {"test"}]')
			.end(function(err, res){
				res.should.have.status(400);
				expect(res.body.error).to.equal('Could not decode request: JSON parsing failed');
				done();
			});
	});


  it('POST /:type/:workflow should filter by specified type and workflow', function(done){
		chai.request(server)
			.post('/avm/pending')
			.send(defaultRequest)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				expect(res.body.response.length).to.equal(1);

				expect(res.body.response[0].concataddress).to.equal('25 Mary St Brisbane QLD 4000');
				expect(res.body.response[0].type).to.equal('avm');
				expect(res.body.response[0].workflow).to.equal('pending');

				done();
			});
  });
});