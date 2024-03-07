"""empty message

Revision ID: cc2c5349f3ec
Revises: fc0ca6a85a72
Create Date: 2024-03-07 11:49:01.851611

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cc2c5349f3ec'
down_revision = 'fc0ca6a85a72'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('paintings', schema=None) as batch_op:
        batch_op.drop_column('fullsize')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('paintings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fullsize', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
