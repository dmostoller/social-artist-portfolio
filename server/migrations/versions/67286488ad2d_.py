"""empty message

Revision ID: 67286488ad2d
Revises: a71f3b792483
Create Date: 2024-03-05 15:46:03.656173

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '67286488ad2d'
down_revision = 'a71f3b792483'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('event_link', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.drop_column('event_link')

    # ### end Alembic commands ###