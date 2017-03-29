(function(angular) {

    function BwcUploadController($scope, $element) {
		console.log(angular.element(this))
        console.log($element)
        $scope.fileList = []
        $scope.action = 'http://api.admin.earth.dev.bwcmall.cn/api/v1/brand/upload?token=7e42b3bbe908bec99a1906dfb7b3004e'
        var autoUpload = true
        var tempIndex = 0
        var onStart = function(rawFile) {
            rawFile.uid = Date.now() + tempIndex++;
            let file = {
                status: 'success',
                name: rawFile.name,
                size: rawFile.size,
                percentage: 0,
                uid: rawFile.uid,
                raw: rawFile
            };

            try {
                file.url = URL.createObjectURL(rawFile);
            } catch (err) {
                console.error(err);
                return;
            }
            $scope.fileList.push(file);
        }
        var beforeUpload = undefined
        window.handleChange = function(ev) {
            console.log(ev.files)
            const files = ev.files;

            if (!files) return;
            uploadFiles(files);
            $scope.file = null;
        }
        $scope.handleClick = function() {
            setTimeout(function() {
                angular.element.find('input[type=file]')[0].click()
            }, 0)
        }

        function uploadFiles(files) {
            let postFiles = Array.prototype.slice.call(files);
            if (true) { postFiles = postFiles.slice(0, 1); }

            if (postFiles.length === 0) { return; }

            postFiles.forEach(rawFile => {
                onStart(rawFile);
                if (autoUpload) upload(rawFile);
            });
        }
        $scope.remove = function(file, raw) {
            if (raw) {
                file = getFile(raw);
            }
            var fileList = $scope.fileList;
            fileList.splice(fileList.indexOf(file), 1);
            // onRemove(file, fileList);
        }

        function getFile(rawFile) {
            var fileList = $scope.fileList;
            var target;
            fileList.every(item => {
                target = rawFile.uid === item.uid ? item : null;
                return !target;
            });
            return target;
        }

        function upload(rawFile, file) {
            if (!beforeUpload) {
                return post(rawFile);
            }

            // const before = this.beforeUpload(rawFile);
            if (before && before.then) {
                before.then(processedFile => {
                    if (Object.prototype.toString.call(processedFile) === '[object File]') {
                        post(processedFile);
                    } else {
                        post(rawFile);
                    }
                }, () => {
                    this.onRemove(rawFile, true);
                });
            } else if (before !== false) {
                post(rawFile);
            } else {
                this.onRemove(rawFile, true);
            }
        }

        function post(rawFile) {
            const request = ajax;
            //TODO 
            request({
                headers: {},
                withCredentials: false,
                file: rawFile,
                data: {},
                filename: 'file',
                action: $scope.action,
                onProgress: e => {
                    // this.onProgress(e, rawFile);
                },
                onSuccess: res => {
                    // this.onSuccess(res, rawFile);
                },
                onError: err => {
                    // this.onError(err, rawFile);
                }
            });
        }

        function ajax(option) {
            if (typeof XMLHttpRequest === 'undefined') {
                return;
            }

            const xhr = new XMLHttpRequest();
            const action = option.action;

            if (xhr.upload) {
                xhr.upload.onprogress = function progress(e) {
                    if (e.total > 0) {
                        e.percent = e.loaded / e.total * 100;
                    }
                    option.onProgress(e);
                };
            }

            const formData = new FormData();

            if (option.data) {
                Object.keys(option.data).map(key => {
                    formData.append(key, option.data[key]);
                });
            }

            formData.append(option.filename, option.file);

            xhr.onerror = function error(e) {
                option.onError(e);
            };

            xhr.onload = function onload() {
                if (xhr.status < 200 || xhr.status >= 300) {
                    return option.onError(getError(action, option, xhr));
                }

                option.onSuccess(getBody(xhr));
            };

            xhr.open('post', action, true);

            if (option.withCredentials && 'withCredentials' in xhr) {
                xhr.withCredentials = true;
            }

            const headers = option.headers || {};

            for (let item in headers) {
                if (headers.hasOwnProperty(item) && headers[item] !== null) {
                    xhr.setRequestHeader(item, headers[item]);
                }
            }
            xhr.send(formData);
            return xhr;
        }

        function getError(action, option, xhr) {
            let msg;
            if (xhr.response) {
                msg = `${xhr.status} ${xhr.response.error || xhr.response}`;
            } else if (xhr.responseText) {
                msg = `${xhr.status} ${xhr.responseText}`;
            } else {
                msg = `fail to post ${action} ${xhr.status}'`;
            }

            const err = new Error(msg);
            err.status = xhr.status;
            err.method = 'post';
            err.url = action;
            return err;
        }

        function getBody(xhr) {
            const text = xhr.responseText || xhr.response;
            if (!text) {
                return text;
            }

            try {
                return JSON.parse(text);
            } catch (e) {
                return text;
            }
        }
    }

    angular.module('bwc.component')
        .component('bwcUpload', {
            template: `<ul ng-class="['el-upload-list', 'el-upload-list--' + 'picture-card']">
							<li ng-repeat="file in fileList" ng-class="['el-upload-list__item', 'is-' + file.status]" key="{{file}}">
								<img class="el-upload-list__item-thumbnail" ng-if="file.status === 'success'" ng-src="{{file.url}}" alt="">
								<label v-show="file.status === 'success'" class="el-upload-list__item-status-label">
											<i class="el-icon-check" ng-click="remove('remove', file)"></i>
										</label>
								<span class="el-upload-list__item-actions" ng-if="file.status === 'success'">
											<span
											ng-click="handlePreview(file)"
											class="el-upload-list__item-preview"
											>
											<i class="el-icon-view"></i>
											</span>
								<span class="el-upload-list__item-delete" ng-click="remove('remove', file)">
												<i class="el-icon-delete2"></i>
											</span>
								</span>
							</li>
						</ul>
						<div class="el-upload el-upload--picture-card" ng-click="handleClick($event)">
							<i class="el-icon-plus"></i>
							<input class="el-upload__input" type="file" ng-model="file" onchange="handleChange(this)" multiple="true"
								accept="PNG|jpg"></input>
						</div>`,
            controller: BwcUploadController,
            bindings: {
                fileList: "=?",
                onSuccess: "=?",
                onRemove: "=?",
                onError: "=?",
                action: '=?'
            }
        });

})(angular);