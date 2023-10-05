import { CollectionViewer, DataSource, ListRange } from '@angular/cdk/collections';
import { BehaviorSubject, filter, Observable, Subject, take, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsHttpService } from '../services/products-http.service';
import { ProductEntity } from '../entities/product.entity';
import { IProductItem } from '../interfaces/product-item.interface';

const MAX_LOADED_PRODUCT_PAGES = 25;

export class ProductsDatasource extends DataSource<ProductEntity> {
  private _minLoadedPage = 0;
  private _maxLoadedPage = 0;
  private _loadedPagesCount = 0;

  private _pageSize: number;
  private readonly _fetchedPages = new Set<number>();
  private readonly _dataSource$: BehaviorSubject<Array<ProductEntity>> = new BehaviorSubject<Array<ProductEntity>>(new Array<ProductEntity>(100_000).fill(null));

  private readonly _disconnect$: Subject<void> = new Subject<void>();

  constructor(
    private readonly _productsHttpService: ProductsHttpService,
  ) {
    super();

    this._init();
  }

  override connect(collectionViewer: CollectionViewer): Observable<Array<ProductEntity>> {
    collectionViewer.viewChange
      .pipe(
        filter((): boolean => !!this._pageSize),
        takeUntil(this._disconnect$),
      )
      .subscribe((range: ListRange): void => {
        const startPage = Math.floor(range.start / this._pageSize);
        const endPage = Math.floor(range.end / this._pageSize);

        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      });

    return this._dataSource$;
  }

  override disconnect(collectionViewer: CollectionViewer): void {
    this._disconnect$.next();
    this._disconnect$.complete();
  }

  private _init(): void {
    this._fetchPage(0);
  }

  private _fetchPage(page: number): void {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);
    this._loadedPagesCount++;

    if (this._maxLoadedPage < page) {
      this._maxLoadedPage = page;
    } else if (this._minLoadedPage > page) {
      this._minLoadedPage = page;
    }

    if (this._loadedPagesCount > MAX_LOADED_PRODUCT_PAGES) {
      if (this._maxLoadedPage === page) {
        this._removePage(this._minLoadedPage);
      } else {
        this._removePage(this._maxLoadedPage);
      }
    }

    this._productsHttpService.getProducts()
      .pipe(
        take(1),
        map((response: Array<IProductItem>): Array<ProductEntity> => response
          .map((product: IProductItem, index: number): ProductEntity => new ProductEntity(product, page * response.length + index))),
        takeUntil(this._disconnect$),
      )
      .subscribe({
        next: (products: Array<ProductEntity>): void => {
          this._pageSize = products.length;

          this._updatePageData(page, products);
        },
        error: (): void => {
          this._removePage(page);
        }
      });
  }

  private _updatePageData(page: number, products: Array<ProductEntity>): void {
    const data = this._dataSource$.getValue();
    data.splice(page * products.length, products.length, ...products);

    this._dataSource$.next(data);
  }

  private _removePage(page: number): void {
    this._updatePageData(page, new Array<ProductEntity>(this._pageSize).fill(null));
    this._fetchedPages.delete(page);
    this._loadedPagesCount--;

    this._recalculateMinMaxLoadedPages();
  }

  private _recalculateMinMaxLoadedPages(): void {
    this._minLoadedPage = this._dataSource$.getValue().length;
    this._maxLoadedPage = 0;
    const pagesIterator = this._fetchedPages.keys();
    for (let i = 0; i <this._fetchedPages.size; i++) {
      const value = pagesIterator.next().value;

      if (value > this._maxLoadedPage) {
        this._maxLoadedPage = value;
      }

      if (value < this._minLoadedPage) {
        this._minLoadedPage = value;
      }
    }
  }
}
