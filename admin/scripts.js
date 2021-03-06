
var isu_ma2_app = new Vue({
	el: '#isu_ma2_app',
	data: {
		message: 'Hello Vue!',
		vars: window.isu_ma2,
		debug: '',
		doingImport: false,
		progressWidth: '0px',
		elCount: null,
		current_item: 0,
		error: '',
		debugLoad: false,
		data: {
			file: '',
			dir: '',
		},
		loaded: true
	},
	methods:{
			callImport(){
			
			const VM = this;
			jQuery.ajax({
				type: 'POST',
				url: VM.vars.ajaxurl,
				data: {
					action: 'import_csv_products',
					data: VM.data,
					debug: VM.debugLoad,
					current_item: VM.current_item
				},
				beforeSend: function(){
				},
				success: function(data, textStatus, jqXHR) {
					console.log(data)
					if(data.items) VM.elCount = data.items; 
					VM.current_item = data.current_item					
					
					if(data.percent) VM.progressWidth = data.percent+"%";
					//$('#progress .progress-bar').text(data.percent+'% ('+data.step+')');
					if(data.html) VM.debug += data.html;

					if( VM.elCount >VM.current_item ){
						VM.callImport(VM.debugLoad);
					}else{
						VM.doingImport = false;
					}
				}
				
			});
	 	},
		 startImport(debug){
			const VM = this;
			if(debug) VM.debugLoad = debug;
			
			if(VM.data.file !== '' && VM.data.dir !== ''){
				if(VM.doingImport) return false;
				VM.error = '';
				VM.debug = '';
				VM.elCoun = 0;
				VM.current_item = 0;
				VM.progressWidth = "0%";
				VM.doingImport = true;
				VM.callImport(VM.debugLoad);
			}else{
				VM.error = 'Wybierz Folder oraz plik csv do importu.';
			}


		}
	}
	})