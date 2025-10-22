from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud, schemas

router = APIRouter()

@router.post('/', response_model=schemas.AuctionOut)
def create_auction(a: schemas.AuctionCreate, db: Session = Depends(get_db)):
    auction = crud.create_auction(db, title=a.title, product_description=a.product_description or '', is_reverse=a.is_reverse)
    return auction

@router.get('/', response_model=list[schemas.AuctionOut])
def list_auctions(db: Session = Depends(get_db)):
    return crud.list_auctions(db)

@router.post('/{auction_id}/bid', response_model=schemas.BidOut)
def place_bid(auction_id: int, b: schemas.BidCreate, db: Session = Depends(get_db)):
    # ensure auction exists
    auction = crud.get_auction(db, auction_id)
    if not auction or not auction.active:
        raise HTTPException(status_code=404, detail='Auction not found or not active')
    # seller existence check (simple)
    # in this simple system we don't check wallet; bids are proposals
    bid = crud.create_bid(db, auction_id=auction_id, seller_id=b.seller_id, amount=b.amount)
    return bid

@router.get('/{auction_id}/bids', response_model=list[schemas.BidOut])
def get_bids(auction_id: int, db: Session = Depends(get_db)):
    auction = crud.get_auction(db, auction_id)
    if not auction:
        raise HTTPException(status_code=404, detail='Auction not found')
    # for reverse auctions, we return low->high, for normal auctions high->low could be used.
    bids = crud.list_bids_for_auction(db, auction_id=auction_id, order_low_to_high=True)
    return bids

@router.post('/{auction_id}/select_winner')
def select_winner(auction_id: int, payload: dict, db: Session = Depends(get_db)):
    """
    payload: { "bid_id": <optional> }
    If buyer does not select, pass { } or { "bid_id": null } => default selects lowest amount (for reverse)
    """
    auction = crud.get_auction(db, auction_id)
    if not auction:
        raise HTTPException(status_code=404, detail='Auction not found')

    bids = crud.list_bids_for_auction(db, auction_id=auction_id, order_low_to_high=True)
    if not bids:
        raise HTTPException(status_code=400, detail='No bids available')

    bid_id = payload.get('bid_id') if isinstance(payload, dict) else None

    if not bid_id:
        # default: lowest amount (since this system is reverse auction by default)
        winner = bids[0]
    else:
        # find chosen bid
        winner = None
        for b in bids:
            if b.id == int(bid_id):
                winner = b
                break
        if not winner:
            raise HTTPException(status_code=404, detail='Selected bid not found')

    # return summary (actual settlement/notification happens off-band)
    return {
        'auction_id': auction_id,
        'winner_bid_id': winner.id,
        'seller_id': winner.seller_id,
        'amount': winner.amount
    }
