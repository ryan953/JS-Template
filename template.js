Template = {
	_cache: {},
	get: function(selector) {
		if (!Template._cache[selector]) {
			Template._cache[selector] = $(selector).html().replace('<!--<![CDATA[', '').replace(']]>-->', '');
		}
		return Template._cache[selector];
	},
	replace: function(template, params, prefix) {
		prefix = (prefix ? prefix + '.' : '');
		var param, obj_type;
		for(param in params) {
			obj_type = typeof(params[param]);
			if (params[param] !== null
				&& params[param] !== undefined
				&& ((obj_type != 'object' && template.indexOf("{" + prefix + param + "}") >= 0) || obj_type == 'object')
			) {
				if (obj_type == 'object') {
					template = Template.replace(template, params[param], prefix + param);
				} else if (obj_type == 'function') {
					template = template.split("{" + prefix + param +"}").join(params[param]());
				} else {
					template = template.split("{" + prefix + param +"}").join(params[param]);
				}
			}
		}
		return template;
	}
};
