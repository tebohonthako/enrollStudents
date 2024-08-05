import * as i0 from '@angular/core';
import { Directive, Input, NgModule } from '@angular/core';
import 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */
class DataTableDirective {
    constructor(el, vcr, renderer) {
        this.el = el;
        this.vcr = vcr;
        this.renderer = renderer;
        /**
         * The DataTable option you pass to configure your table.
         */
        this.dtOptions = {};
    }
    ngOnInit() {
        if (this.dtTrigger) {
            this.dtTrigger.subscribe((options) => {
                this.displayTable(options);
            });
        }
        else {
            this.displayTable(null);
        }
    }
    ngOnDestroy() {
        if (this.dtTrigger) {
            this.dtTrigger.unsubscribe();
        }
        if (this.dt) {
            this.dt.destroy(true);
        }
    }
    displayTable(dtOptions) {
        // assign new options if provided
        if (dtOptions) {
            this.dtOptions = dtOptions;
        }
        this.dtInstance = new Promise((resolve, reject) => {
            Promise.resolve(this.dtOptions).then(resolvedDTOptions => {
                // validate object
                const isTableEmpty = Object.keys(resolvedDTOptions).length === 0 && $('tbody tr', this.el.nativeElement).length === 0;
                if (isTableEmpty) {
                    reject('Both the table and dtOptions cannot be empty');
                    return;
                }
                // Set a column unique
                if (resolvedDTOptions.columns) {
                    resolvedDTOptions.columns.forEach(col => {
                        if ((col.id ?? '').trim() === '') {
                            col.id = this.getColumnUniqueId();
                        }
                    });
                }
                // Using setTimeout as a "hack" to be "part" of NgZone
                setTimeout(() => {
                    // Assign DT properties here
                    let options = {
                        rowCallback: (row, data, index) => {
                            if (resolvedDTOptions.columns) {
                                const columns = resolvedDTOptions.columns;
                                this.applyNgPipeTransform(row, columns);
                                this.applyNgRefTemplate(row, columns, data);
                            }
                            // run user specified row callback if provided.
                            if (resolvedDTOptions.rowCallback) {
                                resolvedDTOptions.rowCallback(row, data, index);
                            }
                        }
                    };
                    // merge user's config with ours
                    options = Object.assign({}, resolvedDTOptions, options);
                    this.dt = $(this.el.nativeElement).DataTable(options);
                    resolve(this.dt);
                });
            });
        });
    }
    applyNgPipeTransform(row, columns) {
        // Filter columns with pipe declared
        const colsWithPipe = columns.filter(x => x.ngPipeInstance && !x.ngTemplateRef);
        colsWithPipe.forEach(el => {
            const pipe = el.ngPipeInstance;
            const pipeArgs = el.ngPipeArgs || [];
            // find index of column using `data` attr
            const i = columns.filter(c => c.visible !== false).findIndex(e => e.id === el.id);
            // get <td> element which holds data using index
            const rowFromCol = row.childNodes.item(i);
            // Transform data with Pipe and PipeArgs
            const rowVal = $(rowFromCol).text();
            const rowValAfter = pipe.transform(rowVal, ...pipeArgs);
            // Apply transformed string to <td>
            $(rowFromCol).text(rowValAfter);
        });
    }
    applyNgRefTemplate(row, columns, data) {
        // Filter columns using `ngTemplateRef`
        const colsWithTemplate = columns.filter(x => x.ngTemplateRef && !x.ngPipeInstance);
        colsWithTemplate.forEach(el => {
            const { ref, context } = el.ngTemplateRef;
            // get <td> element which holds data using index
            const i = columns.filter(c => c.visible !== false).findIndex(e => e.id === el.id);
            const cellFromIndex = row.childNodes.item(i);
            // reset cell before applying transform
            $(cellFromIndex).html('');
            // render onto DOM
            // finalize context to be sent to user
            const _context = Object.assign({}, context, context?.userData, {
                adtData: data
            });
            const instance = this.vcr.createEmbeddedView(ref, _context);
            this.renderer.appendChild(cellFromIndex, instance.rootNodes[0]);
        });
    }
    getColumnUniqueId() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result.trim();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: DataTableDirective, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.5", type: DataTableDirective, selector: "[datatable]", inputs: { dtOptions: "dtOptions", dtTrigger: "dtTrigger" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: DataTableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[datatable]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }], propDecorators: { dtOptions: [{
                type: Input
            }], dtTrigger: [{
                type: Input
            }] } });

/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */
class DataTablesModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: DataTablesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.5", ngImport: i0, type: DataTablesModule, declarations: [DataTableDirective], imports: [CommonModule], exports: [DataTableDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: DataTablesModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.5", ngImport: i0, type: DataTablesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [DataTableDirective],
                    exports: [DataTableDirective]
                }]
        }] });

/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */
/**
 * @module
 * @description
 * Entry point from which you should import all public library APIs.
 */

/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DataTableDirective, DataTablesModule };
//# sourceMappingURL=angular-datatables.mjs.map
